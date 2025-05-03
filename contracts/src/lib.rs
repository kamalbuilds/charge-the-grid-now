use anchor_lang::prelude::*;

declare_id!("ChrgsEjMTwJy1VvDsR6z6G2xNbQwEzK5HyE8mRfPUTnrr");

#[program]
pub mod sol_charge {
    use super::*;

    // Initialize a new charging station
    pub fn initialize_charger(
        ctx: Context<InitializeCharger>,
        name: String,
        price: u64, // Price in lamports per kWh
        charger_type: String,
        power: u64, // in watts
        latitude: f64,
        longitude: f64,
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        let owner = &ctx.accounts.owner;

        // Set charger data
        charger.owner = owner.key();
        charger.name = name;
        charger.price = price;
        charger.charger_type = charger_type;
        charger.power = power;
        charger.status = "Available".to_string();
        charger.latitude = latitude;
        charger.longitude = longitude;
        charger.total_energy = 0;
        charger.total_revenue = 0;
        charger.rating = 0;
        charger.rating_count = 0;
        charger.uptime_score = 100; // Start with perfect score
        charger.last_maintenance = Clock::get()?.unix_timestamp;
        charger.maintenance_due = false;

        // Initialize timestamp
        charger.created_at = Clock::get()?.unix_timestamp;
        charger.updated_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    // Update charger details
    pub fn update_charger(
        ctx: Context<UpdateCharger>,
        name: Option<String>,
        price: Option<u64>,
        charger_type: Option<String>,
        power: Option<u64>,
        status: Option<String>,
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        
        // Only update fields that are provided
        if let Some(new_name) = name {
            charger.name = new_name;
        }
        
        if let Some(new_price) = price {
            charger.price = new_price;
        }
        
        if let Some(new_type) = charger_type {
            charger.charger_type = new_type;
        }
        
        if let Some(new_power) = power {
            charger.power = new_power;
        }
        
        if let Some(new_status) = status {
            charger.status = new_status;
        }
        
        // Update timestamp
        charger.updated_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // Start a charging session
    pub fn start_charging(
        ctx: Context<StartCharging>,
        max_amount: u64, // Maximum SOL amount the user is willing to spend
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        let session = &mut ctx.accounts.charging_session;
        let user = &ctx.accounts.user;
        
        require!(
            charger.status == "Available",
            ChargingError::ChargerNotAvailable
        );
        
        require!(
            !charger.maintenance_due,
            ChargingError::MaintenanceRequired
        );
        
        // Create session data
        session.charger = charger.key();
        session.user = user.key();
        session.start_time = Clock::get()?.unix_timestamp;
        session.end_time = 0; // Will be set when charging ends
        session.max_amount = max_amount;
        session.energy_used = 0;
        session.amount_paid = 0;
        session.active = true;
        session.rated = false;
        
        // Update charger status
        charger.status = "In Use".to_string();
        charger.updated_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // End a charging session
    pub fn end_charging(
        ctx: Context<EndCharging>,
        energy_used: u64, // Energy used in Wh
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        let session = &mut ctx.accounts.charging_session;
        let user = &ctx.accounts.user;
        let owner = &ctx.accounts.owner;
        
        require!(session.user == user.key(), ChargingError::Unauthorized);
        require!(session.active, ChargingError::SessionNotActive);
        
        // Calculate payment
        let price_per_kwh = charger.price;
        let kwh_used = energy_used as f64 / 1000.0;
        let amount_to_pay = (kwh_used * price_per_kwh as f64) as u64;
        
        // Ensure the payment doesn't exceed max amount
        let final_payment = std::cmp::min(amount_to_pay, session.max_amount);
        
        // Transfer funds from user to owner
        // In a real implementation, this would use the CHARGE token
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: user.to_account_info(),
                to: owner.to_account_info(),
            },
        );
        
        anchor_lang::system_program::transfer(cpi_context, final_payment)?;
        
        // Update session data
        session.end_time = Clock::get()?.unix_timestamp;
        session.energy_used = energy_used;
        session.amount_paid = final_payment;
        session.active = false;
        
        // Update charger data
        charger.status = "Available".to_string();
        charger.total_energy += energy_used;
        charger.total_revenue += final_payment;
        charger.updated_at = Clock::get()?.unix_timestamp;
        
        // Check if maintenance is due (every 100 charging sessions or 10,000 kWh)
        let sessions_since_maintenance = charger.total_energy / 10_000_000; // 10,000 kWh in Wh
        if sessions_since_maintenance > 0 && sessions_since_maintenance % 1 == 0 {
            charger.maintenance_due = true;
        }
        
        Ok(())
    }

    // Rate a charger after usage
    pub fn rate_charger(
        ctx: Context<RateCharger>,
        rating: u8, // 1-5 star rating
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        let session = &mut ctx.accounts.charging_session;
        
        // Ensure rating is valid
        require!(
            rating >= 1 && rating <= 5,
            ChargingError::InvalidRating
        );
        
        // Ensure session belongs to user and has ended
        require!(
            session.user == ctx.accounts.user.key(),
            ChargingError::Unauthorized
        );
        
        require!(
            !session.active && session.end_time > 0,
            ChargingError::SessionStillActive
        );
        
        require!(
            !session.rated,
            ChargingError::AlreadyRated
        );
        
        // Calculate new average rating
        let total_rating_points = charger.rating * charger.rating_count + rating as u64;
        charger.rating_count += 1;
        charger.rating = total_rating_points / charger.rating_count;
        
        // Mark session as rated
        session.rated = true;
        
        Ok(())
    }

    // Record charger maintenance
    pub fn record_maintenance(
        ctx: Context<RecordMaintenance>,
        maintenance_notes: String,
    ) -> Result<()> {
        let charger = &mut ctx.accounts.charger;
        
        // Ensure maintenance can only be performed when charger is not in use
        require!(
            charger.status != "In Use",
            ChargingError::ChargerInUse
        );
        
        // Reset maintenance flags
        charger.maintenance_due = false;
        charger.last_maintenance = Clock::get()?.unix_timestamp;
        
        // Create maintenance record
        let maintenance = &mut ctx.accounts.maintenance_record;
        maintenance.charger = charger.key();
        maintenance.performed_by = ctx.accounts.owner.key();
        maintenance.timestamp = Clock::get()?.unix_timestamp;
        maintenance.notes = maintenance_notes;
        
        Ok(())
    }

    // Mint WATT tokens based on validated charging activity
    pub fn mint_watt_rewards(
        ctx: Context<MintRewards>,
        amount: u64, // Proportional to kWh delivered
    ) -> Result<()> {
        // This would integrate with token program to mint WATT tokens
        // For this example, we're just recording the reward
        let rewards = &mut ctx.accounts.rewards;
        let session = &ctx.accounts.charging_session;
        
        // Validate that the charging session was completed
        require!(
            session.end_time > 0,
            ChargingError::SessionNotActive
        );
        
        // Ensure the charger has a good uptime score
        let charger = &ctx.accounts.charger;
        require!(
            charger.uptime_score >= 95,
            ChargingError::LowUptimeScore
        );
        
        // Calculate rewards based on energy delivered
        let energy_delivered = session.energy_used;
        let rewards_amount = (energy_delivered as f64 / 1000.0) as u64; // ~1 WATT per kWh
        
        // Apply a multiplier based on rating (1.0 to 1.5x)
        let rating_multiplier = 10 + (charger.rating as u64 / 2); // 1.0 to 1.5
        let final_rewards = rewards_amount * rating_multiplier / 10;
        
        // Record rewards
        rewards.charger = session.charger;
        rewards.owner = ctx.accounts.owner.key();
        rewards.session = session.key();
        rewards.amount = final_rewards;
        rewards.claimed = false;
        rewards.timestamp = Clock::get()?.unix_timestamp;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeCharger<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + // Discriminator
               32 + // owner
               200 + // name (max 200 chars)
               8 + // price
               50 + // charger_type (max 50 chars)
               8 + // power
               50 + // status (max 50 chars)
               8 + // latitude
               8 + // longitude
               8 + // total_energy
               8 + // total_revenue
               8 + // rating
               8 + // rating_count
               8 + // uptime_score
               8 + // last_maintenance
               1 + // maintenance_due
               8 + // created_at
               8 // updated_at
    )]
    pub charger: Account<'info, Charger>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCharger<'info> {
    #[account(
        mut,
        has_one = owner @ ChargingError::Unauthorized
    )]
    pub charger: Account<'info, Charger>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct StartCharging<'info> {
    #[account(mut)]
    pub charger: Account<'info, Charger>,
    #[account(
        init,
        payer = user,
        space = 8 + // Discriminator
               32 + // charger
               32 + // user
               8 + // start_time
               8 + // end_time
               8 + // max_amount
               8 + // energy_used
               8 + // amount_paid
               1 + // active
               1 // rated
    )]
    pub charging_session: Account<'info, ChargingSession>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EndCharging<'info> {
    #[account(mut)]
    pub charger: Account<'info, Charger>,
    #[account(
        mut,
        constraint = charging_session.charger == charger.key() @ ChargingError::InvalidSession
    )]
    pub charging_session: Account<'info, ChargingSession>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        constraint = owner.key() == charger.owner @ ChargingError::Unauthorized
    )]
    pub owner: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RateCharger<'info> {
    #[account(mut)]
    pub charger: Account<'info, Charger>,
    #[account(
        mut,
        constraint = charging_session.charger == charger.key() @ ChargingError::InvalidSession
    )]
    pub charging_session: Account<'info, ChargingSession>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct RecordMaintenance<'info> {
    #[account(
        mut,
        has_one = owner @ ChargingError::Unauthorized
    )]
    pub charger: Account<'info, Charger>,
    #[account(
        init,
        payer = owner,
        space = 8 + // Discriminator
               32 + // charger
               32 + // performed_by
               8 + // timestamp
               200 // notes (max 200 chars)
    )]
    pub maintenance_record: Account<'info, MaintenanceRecord>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintRewards<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + // Discriminator
               32 + // charger
               32 + // owner
               32 + // session
               8 + // amount
               1 + // claimed
               8 // timestamp
    )]
    pub rewards: Account<'info, WattRewards>,
    pub charging_session: Account<'info, ChargingSession>,
    pub charger: Account<'info, Charger>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Charger {
    pub owner: Pubkey,
    pub name: String,
    pub price: u64,
    pub charger_type: String,
    pub power: u64,
    pub status: String,
    pub latitude: f64,
    pub longitude: f64,
    pub total_energy: u64,
    pub total_revenue: u64,
    pub rating: u64,
    pub rating_count: u64,
    pub uptime_score: u64,
    pub last_maintenance: i64,
    pub maintenance_due: bool,
    pub created_at: i64,
    pub updated_at: i64,
}

#[account]
pub struct ChargingSession {
    pub charger: Pubkey,
    pub user: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub max_amount: u64,
    pub energy_used: u64,
    pub amount_paid: u64,
    pub active: bool,
    pub rated: bool,
}

#[account]
pub struct MaintenanceRecord {
    pub charger: Pubkey,
    pub performed_by: Pubkey,
    pub timestamp: i64,
    pub notes: String,
}

#[account]
pub struct WattRewards {
    pub charger: Pubkey,
    pub owner: Pubkey,
    pub session: Pubkey,
    pub amount: u64,
    pub claimed: bool,
    pub timestamp: i64,
}

#[error_code]
pub enum ChargingError {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
    #[msg("Charger is not available")]
    ChargerNotAvailable,
    #[msg("Charging session is not active")]
    SessionNotActive,
    #[msg("Invalid charging session")]
    InvalidSession,
    #[msg("Invalid rating, must be between 1 and 5")]
    InvalidRating,
    #[msg("Session is still active")]
    SessionStillActive,
    #[msg("You have already rated this session")]
    AlreadyRated,
    #[msg("Charger is currently in use")]
    ChargerInUse,
    #[msg("Maintenance is required before charging")]
    MaintenanceRequired,
    #[msg("Uptime score is too low for rewards")]
    LowUptimeScore,
} 
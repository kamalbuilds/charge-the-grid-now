
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
        
        // Create session data
        session.charger = charger.key();
        session.user = user.key();
        session.start_time = Clock::get()?.unix_timestamp;
        session.end_time = 0; // Will be set when charging ends
        session.max_amount = max_amount;
        session.energy_used = 0;
        session.amount_paid = 0;
        session.active = true;
        
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
        let token_program = &ctx.accounts.token_program;
        
        require!(session.user == user.key(), ChargingError::Unauthorized);
        require!(session.active, ChargingError::SessionNotActive);
        
        // Calculate payment
        let price_per_kwh = charger.price;
        let kwh_used = energy_used as f64 / 1000.0;
        let amount_to_pay = (kwh_used * price_per_kwh as f64) as u64;
        
        // Ensure the payment doesn't exceed max amount
        let final_payment = std::cmp::min(amount_to_pay, session.max_amount);
        
        // Transfer funds from user to owner
        // In a real implementation, this would be a token transfer
        // For simplicity, we're just recording the payment here
        
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
               1 // active
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
    pub user: Signer<'info>,
    #[account(mut)]
    pub owner: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
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
}

// For token transfers (would use in a real implementation)
pub mod token {
    use super::*;
    use anchor_lang::solana_program;

    // Define token program ID
    pub use spl_token::ID as TOKEN_PROGRAM_ID;

    // Define token program
    #[derive(Clone)]
    pub struct Token;

    impl anchor_lang::Id for Token {
        fn id() -> Pubkey {
            TOKEN_PROGRAM_ID
        }
    }
}

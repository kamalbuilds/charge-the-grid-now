use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

declare_id!("StakeEjMTwJy1VvDsR6z6G2xNbQwEzK5HyE8mRfPUTnXX");

#[program]
pub mod sol_charge_staking {
    use super::*;

    // Stake CHARGE tokens to register a charger
    pub fn stake_for_charger(
        ctx: Context<StakeForCharger>,
        amount: u64,
        charger_id: Pubkey,
    ) -> Result<()> {
        // Minimum staking amount (1000 CHARGE)
        let min_stake = 1000 * 10u64.pow(9); // 1000 tokens with 9 decimals
        require!(amount >= min_stake, StakingError::InsufficientStake);
        
        // Transfer tokens to stake account
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.staker_token_account.to_account_info(),
            to: ctx.accounts.stake_token_account.to_account_info(),
            authority: ctx.accounts.staker.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
        
        // Update stake data
        let stake_data = &mut ctx.accounts.stake_data;
        stake_data.staker = ctx.accounts.staker.key();
        stake_data.amount = amount;
        stake_data.charger = charger_id;
        stake_data.start_time = Clock::get()?.unix_timestamp;
        stake_data.last_reward_time = Clock::get()?.unix_timestamp;
        stake_data.rewards_claimed = 0;
        
        Ok(())
    }

    // Unstake CHARGE tokens (with timelock)
    pub fn unstake(
        ctx: Context<Unstake>,
    ) -> Result<()> {
        let stake_data = &ctx.accounts.stake_data;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Ensure minimum staking period (30 days)
        let min_staking_period = 30 * 24 * 60 * 60; // 30 days in seconds
        require!(
            current_time - stake_data.start_time >= min_staking_period,
            StakingError::StakingPeriodNotMet
        );
        
        // Transfer tokens back to staker
        let authority_seeds = &[
            b"stake_authority".as_ref(),
            &[ctx.bumps.stake_authority],
        ];
        
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.stake_token_account.to_account_info(),
            to: ctx.accounts.staker_token_account.to_account_info(),
            authority: ctx.accounts.stake_authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            &[&authority_seeds[..]],
        );
        
        token::transfer(cpi_ctx, stake_data.amount)?;
        
        // Mark stake data as closed
        let stake_data = &mut ctx.accounts.stake_data;
        stake_data.is_active = false;
        
        Ok(())
    }
    
    // Claim staking rewards
    pub fn claim_rewards(
        ctx: Context<ClaimRewards>,
    ) -> Result<()> {
        let stake_data = &mut ctx.accounts.stake_data;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Calculate time since last reward
        let time_since_last_reward = current_time - stake_data.last_reward_time;
        require!(time_since_last_reward > 0, StakingError::NoRewardsToClaim);
        
        // Calculate reward (simple APY of 10%)
        // Formula: (amount * APY * time) / (365 days in seconds)
        let annual_rate = 10; // 10% APY
        let annual_seconds = 365 * 24 * 60 * 60;
        let reward_amount = (stake_data.amount as u128)
            .saturating_mul(annual_rate as u128)
            .saturating_mul(time_since_last_reward as u128)
            .saturating_div(100)
            .saturating_div(annual_seconds as u128) as u64;
        
        // Ensure there's a reward to claim
        require!(reward_amount > 0, StakingError::NoRewardsToClaim);
        
        // Transfer rewards from reward pool to staker
        let authority_seeds = &[
            b"reward_authority".as_ref(),
            &[ctx.bumps.reward_authority],
        ];
        
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.reward_token_account.to_account_info(),
            to: ctx.accounts.staker_token_account.to_account_info(),
            authority: ctx.accounts.reward_authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            &[&authority_seeds[..]],
        );
        
        token::transfer(cpi_ctx, reward_amount)?;
        
        // Update stake data
        stake_data.last_reward_time = current_time;
        stake_data.rewards_claimed += reward_amount;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StakeForCharger<'info> {
    #[account(mut)]
    pub staker_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = stake_token_account.owner == stake_authority.key() @ StakingError::InvalidStakeAccount
    )]
    pub stake_token_account: Account<'info, TokenAccount>,
    #[account(
        seeds = [b"stake_authority"],
        bump
    )]
    /// CHECK: This is a PDA used as the authority for the stake account
    pub stake_authority: AccountInfo<'info>,
    #[account(
        init,
        payer = staker,
        space = 8 + // Discriminator
               32 + // staker
               8 + // amount
               32 + // charger
               8 + // start_time
               8 + // last_reward_time
               8 + // rewards_claimed
               1 // is_active
    )]
    pub stake_data: Account<'info, StakeData>,
    #[account(mut)]
    pub staker: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(
        mut,
        constraint = stake_data.staker == staker.key() @ StakingError::Unauthorized,
        constraint = stake_data.is_active @ StakingError::StakeInactive
    )]
    pub stake_data: Account<'info, StakeData>,
    #[account(mut)]
    pub staker_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = stake_token_account.owner == stake_authority.key() @ StakingError::InvalidStakeAccount
    )]
    pub stake_token_account: Account<'info, TokenAccount>,
    #[account(
        seeds = [b"stake_authority"],
        bump
    )]
    /// CHECK: This is a PDA used as the authority for the stake account
    pub stake_authority: AccountInfo<'info>,
    pub staker: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(
        mut,
        constraint = stake_data.staker == staker.key() @ StakingError::Unauthorized,
        constraint = stake_data.is_active @ StakingError::StakeInactive
    )]
    pub stake_data: Account<'info, StakeData>,
    #[account(mut)]
    pub staker_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub reward_token_account: Account<'info, TokenAccount>,
    #[account(
        seeds = [b"reward_authority"],
        bump
    )]
    /// CHECK: This is a PDA used as the authority for the reward account
    pub reward_authority: AccountInfo<'info>,
    pub staker: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StakeData {
    pub staker: Pubkey,
    pub amount: u64,
    pub charger: Pubkey,
    pub start_time: i64,
    pub last_reward_time: i64,
    pub rewards_claimed: u64,
    pub is_active: bool,
}

#[error_code]
pub enum StakingError {
    #[msg("Minimum staking amount not met")]
    InsufficientStake,
    #[msg("Minimum staking period not met")]
    StakingPeriodNotMet,
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
    #[msg("Invalid stake account")]
    InvalidStakeAccount,
    #[msg("No rewards to claim")]
    NoRewardsToClaim,
    #[msg("Stake is not active")]
    StakeInactive,
} 
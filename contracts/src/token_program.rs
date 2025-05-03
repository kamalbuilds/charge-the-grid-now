use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("TokenEjMTwJy1VvDsR6z6G2xNbQwEzK5HyE8mRfPUTnVV");

#[program]
pub mod sol_charge_tokens {
    use super::*;

    // Initialize CHARGE token with fixed supply
    pub fn initialize_charge_token(
        ctx: Context<InitializeToken>,
        total_supply: u64,
    ) -> Result<()> {
        // Mint the total supply to the treasury
        let cpi_accounts = token::MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.treasury.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, total_supply)?;
        
        // Initialize token parameters
        let token_info = &mut ctx.accounts.token_info;
        token_info.mint = ctx.accounts.mint.key();
        token_info.name = "CHARGE".to_string();
        token_info.symbol = "CHARGE".to_string();
        token_info.decimals = 9;
        token_info.total_supply = total_supply;
        token_info.treasury = ctx.accounts.treasury.key();
        token_info.authority = ctx.accounts.mint_authority.key();
        token_info.created_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // Initialize WATT token
    pub fn initialize_watt_token(
        ctx: Context<InitializeToken>,
    ) -> Result<()> {
        // Initialize token parameters - No initial supply for WATT
        let token_info = &mut ctx.accounts.token_info;
        token_info.mint = ctx.accounts.mint.key();
        token_info.name = "WATT".to_string();
        token_info.symbol = "WATT".to_string();
        token_info.decimals = 9;
        token_info.total_supply = 0; // WATT tokens are minted based on energy delivered
        token_info.treasury = ctx.accounts.treasury.key();
        token_info.authority = ctx.accounts.mint_authority.key();
        token_info.created_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // Mint WATT tokens based on validated charging activity
    pub fn mint_watt(
        ctx: Context<MintWatt>,
        amount: u64, // Amount to mint
    ) -> Result<()> {
        // Only allow minting from the SolCharge program
        require!(
            ctx.accounts.authorized_program.key() == crate::ID,
            TokenError::UnauthorizedMint
        );
        
        // Mint WATT tokens to the recipient
        let cpi_accounts = token::MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.recipient.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, amount)?;
        
        // Update total supply
        let token_info = &mut ctx.accounts.token_info;
        token_info.total_supply += amount;
        
        Ok(())
    }

    // Burn CHARGE tokens from transaction fees
    pub fn burn_charge(
        ctx: Context<BurnTokens>,
        amount: u64, // Amount to burn
    ) -> Result<()> {
        // Burn CHARGE tokens
        let cpi_accounts = token::Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::burn(cpi_ctx, amount)?;
        
        // Update total supply
        let token_info = &mut ctx.accounts.token_info;
        token_info.total_supply = token_info.total_supply.saturating_sub(amount);
        
        Ok(())
    }
    
    // Process a payment transaction
    pub fn process_transaction(
        ctx: Context<ProcessTransaction>,
        amount: u64, // Payment amount
    ) -> Result<()> {
        // Calculate fee (2% of transaction amount)
        let fee_percentage = 2;
        let fee_amount = amount.saturating_mul(fee_percentage).saturating_div(100);
        let recipient_amount = amount.saturating_sub(fee_amount);
        
        // Transfer main amount to recipient
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.payer_account.to_account_info(),
            to: ctx.accounts.recipient_account.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, recipient_amount)?;
        
        // Transfer fee to treasury
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.payer_account.to_account_info(),
            to: ctx.accounts.treasury.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );
        token::transfer(cpi_ctx, fee_amount)?;
        
        // Calculate amount to burn (50% of fee)
        let burn_amount = fee_amount.saturating_div(2);
        
        // Burn tokens from treasury
        let cpi_accounts = token::Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.treasury.to_account_info(),
            authority: ctx.accounts.treasury_authority.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );
        token::burn(cpi_ctx, burn_amount)?;
        
        // Update token info
        let token_info = &mut ctx.accounts.token_info;
        token_info.total_supply = token_info.total_supply.saturating_sub(burn_amount);
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeToken<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub mint_authority: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + // Discriminator
               32 + // mint
               50 + // name
               10 + // symbol
               1 + // decimals
               8 + // total supply
               32 + // treasury
               32 + // authority
               8 // created_at
    )]
    pub token_info: Account<'info, TokenInfo>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintWatt<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = token_info.mint == mint.key() @ TokenError::InvalidMint
    )]
    pub token_info: Account<'info, TokenInfo>,
    #[account(mut)]
    pub recipient: Account<'info, TokenAccount>,
    pub mint_authority: Signer<'info>,
    /// CHECK: This account is verified in the instruction
    pub authorized_program: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BurnTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = token_info.mint == mint.key() @ TokenError::InvalidMint
    )]
    pub token_info: Account<'info, TokenInfo>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    pub owner: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ProcessTransaction<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = token_info.mint == mint.key() @ TokenError::InvalidMint
    )]
    pub token_info: Account<'info, TokenInfo>,
    #[account(mut)]
    pub payer_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub recipient_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = treasury.key() == token_info.treasury @ TokenError::InvalidTreasury
    )]
    pub treasury: Account<'info, TokenAccount>,
    pub payer: Signer<'info>,
    pub treasury_authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct TokenInfo {
    pub mint: Pubkey,
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: u64,
    pub treasury: Pubkey,
    pub authority: Pubkey,
    pub created_at: i64,
}

#[error_code]
pub enum TokenError {
    #[msg("Invalid mint address")]
    InvalidMint,
    #[msg("Invalid treasury account")]
    InvalidTreasury,
    #[msg("Unauthorized mint attempt")]
    UnauthorizedMint,
} 
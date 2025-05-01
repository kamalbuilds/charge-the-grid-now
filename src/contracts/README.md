
# SolCharge Solana Program

This is the on-chain program for the SolCharge decentralized EV charging network built on Solana.

## Features

- Register EV charging stations on-chain
- Track charging station availability
- Manage charging sessions
- Process payments in $CHARGE tokens
- Record energy usage data

## Getting Started

### Prerequisites

- Rust and Cargo
- Solana CLI tools
- Anchor framework

### Installation

1. Install the Solana CLI tools:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"
```

2. Install Anchor:
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

3. Build the program:
```bash
anchor build
```

4. Deploy to devnet:
```bash
anchor deploy --provider.cluster devnet
```

### Usage

The program exposes the following instructions:

- `initialize_charger`: Register a new charging station
- `update_charger`: Update charging station details
- `start_charging`: Start a charging session
- `end_charging`: End a charging session and process payment

## Testing

Run the test suite:

```bash
anchor test
```

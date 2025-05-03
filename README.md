# SolCharge: Decentralized EV Charging Network

SolCharge is a decentralized physical infrastructure network (DePIN) built on Solana that connects electric vehicle owners with charging stations through blockchain technology.

![SolCharge](public/images/solcharge-banner.png)

## 🔌 Overview

SolCharge allows anyone to register their EV charger into the network and earn passive income in the form of $WATT tokens. Simultaneously, EV owners gain access to a growing network of affordable charging stations around the world.

By removing intermediaries and leveraging blockchain technology, SolCharge creates a more efficient, transparent, and accessible EV charging ecosystem.

## 💡 Key Features

- **Decentralized Charging Network**: Connect your charger and earn rewards for energy delivered
- **Dual-Token Economy**: CHARGE (governance) and WATT (utility) tokens create a balanced ecosystem
- **Smart Contracts**: Transparent pricing, automated payments, and verifiable energy delivery
- **Rating System**: Quality assurance through user ratings and reviews
- **Maintenance Tracking**: Scheduled maintenance tracking ensures reliable charging stations
- **Global Accessibility**: Use any charger in the network with your Solana wallet
- **Low Fees**: Near-zero gas fees on Solana make micropayments viable

## 🏗️ Project Structure

```
SolCharge/
├── app/                 # Next.js application
│   ├── app/             # App router pages
│   ├── components/      # UI components
│   ├── lib/             # Utility functions
│   ├── providers/       # Context providers
│   ├── public/          # Static assets
│   └── styles/          # Global styles
├── contracts/           # Solana smart contracts
│   ├── Anchor.toml      # Anchor configuration
│   └── src/             # Rust contract code
│       ├── lib.rs       # Main charging contract
│       ├── token_program.rs  # Token implementations
│       └── staking.rs   # Staking implementation
└── README.md            # Project documentation
```

## 🧰 Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Solana blockchain
- **Smart Contracts**: Rust, Anchor framework
- **Wallet Integration**: Solana Wallet Adapter
- **Data Storage**: Solana blockchain + IPFS for metadata

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Rust and Cargo
- Solana CLI tools
- Anchor framework
- Phantom wallet or another Solana wallet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/solcharge.git
   cd solcharge
   ```

2. Install frontend dependencies:
   ```bash
   cd app
   npm install
   ```

3. Build Solana contracts:
   ```bash
   cd contracts
   anchor build
   ```

4. Run the development server:
   ```bash
   cd app
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Tokenomics

### CHARGE Token

- **Supply**: Fixed at 100,000,000 CHARGE
- **Distribution**:
  - Community Rewards: 40%
  - Protocol Treasury: 25%
  - Team & Advisors: 15%
  - Strategic Partners: 10%
  - Liquidity & Marketing: 10%
- **Utility**:
  - Governance voting
  - Payment for charging services
  - Staking to register chargers
  - Fee reduction for network users

### WATT Token

- **Supply**: Dynamic based on network usage (no fixed maximum)
- **Minting Conditions**:
  - 1 WATT per kWh of verified energy delivery
  - Charger uptime score above 95%
  - Positive user ratings (>4.5/5 stars)
- **Utility**:
  - Rewards for charger hosts
  - Convertible to CHARGE via staking
  - Access to premium network features

## 🔍 Contract Details

### Main Charging Contract (`lib.rs`)

This contract manages charging stations, sessions, and rewards:

- **Charger Registration**: Register an EV charger with location, pricing
- **Session Management**: Start and end charging sessions with automatic payment
- **Rating System**: Allow users to rate charging experiences
- **Maintenance Tracking**: Record and require periodic maintenance
- **Reward Distribution**: Calculate and distribute WATT tokens based on energy delivery

### Token Contract (`token_program.rs`)

Implements the CHARGE and WATT token functionality:

- **Token Creation**: Initialize both token types
- **Minting Logic**: Rules for minting new WATT tokens
- **Burning Mechanism**: Fee burning for deflationary pressure on CHARGE
- **Transaction Processing**: Handling payments with fee calculation

### Staking Contract (`staking.rs`)

Manages staking operations for charger hosts:

- **Stake to Register**: Staking CHARGE tokens to register a charger
- **Rewards Calculation**: Time-based reward accrual
- **Unstaking**: Rules for unstaking tokens after minimum period
- **Reward Claims**: Process for claiming accumulated rewards

## 🌐 Deployment

Currently deployed on Solana Devnet:
- Program ID: `ChrgsEjMTwJy1VvDsR6z6G2xNbQwEzK5HyE8mRfPUTnrr`
- Token ID: `TokenEjMTwJy1VvDsR6z6G2xNbQwEzK5HyE8mRfPUTnVV`

## 🔗 Links

- [Website](https://solcharge.com)
- [Documentation](https://docs.solcharge.com)
- [Twitter](https://twitter.com/solcharge)
- [Discord](https://discord.gg/solcharge)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Solana Foundation
- Solana Breakpoint Hackathon
- All the contributors and community members

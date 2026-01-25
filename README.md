# TrustBill

A simple platform on Stacks blockchain for paying bills like airtime, data subscription, utilities, and more using STX tokens.

## Overview

TrustBill is a Clarity smart contract that enables users to:
- Pay airtime bills
- Pay data subscription bills
- Create custom bill payments for utilities and other services
- Track payment history on the blockchain
- Process payments securely with STX tokens

## Features

- **Multiple Bill Types**: Support for airtime, data subscriptions, utilities, and custom bill types
- **Payment Tracking**: All payments are recorded on-chain with unique payment IDs
- **Secure Payments**: Only the payer can process their own payments
- **Service Fee**: Configurable service fee percentage (default: 5%)
- **Provider Registry**: Admin can register bill providers for different bill types
- **Transparent**: All payment records are publicly accessible

## Contract Details

### Bill Types

- `1` - Airtime
- `2` - Data Subscription
- `3` - Utility
- `4` - Other

### Functions

#### Public Functions

**Create Bill Payments:**
- `pay-airtime(recipient: string-ascii, amount: uint)` - Create an airtime payment
- `pay-data-subscription(recipient: string-ascii, amount: uint)` - Create a data subscription payment
- `create-bill-payment(bill-type: uint, recipient: string-ascii, amount: uint)` - Create a custom bill payment

**Process Payments:**
- `process-payment(payment-id: uint)` - Process a pending payment by transferring STX

**Admin Functions:**
- `set-service-fee(new-fee: uint)` - Update service fee percentage (admin only)
- `register-provider(provider: principal, bill-type: uint)` - Register a provider for a bill type (admin only)
- `set-admin(new-admin: principal)` - Change admin address (admin only)

#### Read-Only Functions

- `get-payment(payment-id: uint)` - Get payment details by ID
- `get-payment-counter()` - Get total number of payments
- `get-admin()` - Get current admin address
- `get-service-fee()` - Get current service fee percentage
- `is-provider-registered(provider: principal, bill-type: uint)` - Check if provider is registered

### Error Codes

- `u1` - ERR-UNAUTHORIZED
- `u2` - ERR-INVALID-AMOUNT
- `u3` - ERR-INSUFFICIENT-BALANCE
- `u4` - ERR-BILL-NOT-FOUND
- `u5` - ERR-INVALID-RECIPIENT
- `u6` - ERR-PAYMENT-FAILED

## Getting Started

### Prerequisites

- [Clarinet](https://docs.hiro.so/stacks/clarinet-cli) installed
- Node.js and npm installed

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Testing

Run the test suite:
```bash
npm test
```

For detailed test reports with coverage:
```bash
npm run test:report
```

### Usage Examples

#### Create an Airtime Payment

```typescript
const recipient = "08012345678";
const amount = 1000000; // 1 STX in micro-STX

const result = await contract.call("pay-airtime", [recipient, amount]);
```

#### Process a Payment

```typescript
const paymentId = 1;
const result = await contract.call("process-payment", [paymentId]);
```

#### Query Payment Details

```typescript
const paymentId = 1;
const payment = await contract.callReadOnly("get-payment", [paymentId]);
```

## Contract Deployment

### Local Development

1. Start a local devnet:
```bash
clarinet devnet start
```

2. Deploy the contract:
```bash
clarinet deploy --devnet
```

### Testnet/Mainnet Deployment

Update the network settings in `settings/Testnet.toml` or `settings/Mainnet.toml` and deploy:
```bash
clarinet deploy --testnet
# or
clarinet deploy --mainnet
```

## Payment Flow

1. **Create Payment**: User calls `pay-airtime`, `pay-data-subscription`, or `create-bill-payment` to create a pending payment
2. **Process Payment**: User calls `process-payment` with the payment ID to transfer STX and complete the payment
3. **Track Payments**: All payments are stored on-chain and can be queried using `get-payment`

## Security Considerations

- Only the payer can process their own payments
- Admin functions are restricted to the contract admin
- Service fee is configurable but limited to a maximum of 100%
- All payment amounts must be greater than 0

## License

ISC

## Author

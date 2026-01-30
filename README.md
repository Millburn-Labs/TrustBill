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

### Integration Libraries

This project uses:
- **@stacks/connect**: For wallet connection and user authentication
- **@stacks/transactions**: For building and broadcasting transactions
- **@stacks/clarinet-sdk**: For testing Clarity contracts

The integration utilities are located in the `src/` directory:
- `src/trustbill-client.ts`: Main client class for contract interactions
- `src/example-integration.ts`: Example usage patterns

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

#### Using TrustBill Client with @stacks/connect

The project includes a `TrustBillClient` utility class that integrates `@stacks/connect` and `@stacks/transactions` for easy contract interactions.

```typescript
import { TrustBillClient, BillType } from './src/trustbill-client.js';
import { StacksTestnet } from '@stacks/network';

// Initialize the client
const client = new TrustBillClient({
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Your contract address
  contractName: 'trustbill',
  network: new StacksTestnet(),
});

// Create an airtime payment
await client.payAirtime(
  '08012345678', // Recipient phone number
  1000000, // Amount in micro-STX (1 STX)
  {
    onFinish: (data) => {
      console.log('Payment created:', data);
    },
    onCancel: () => {
      console.log('Payment cancelled');
    },
  }
);

// Process a payment
await client.processPayment(1, {
  onFinish: (data) => {
    console.log('Payment processed:', data);
  },
});

// Create a custom bill payment
await client.createBillPayment(
  BillType.UTILITY,
  'utility-account-123',
  5000000,
  {
    onFinish: (data) => console.log('Bill payment created:', data),
  }
);
```

#### Direct Contract Calls with @stacks/connect

You can also use `@stacks/connect` directly:

```typescript
import { openContractCall } from '@stacks/connect';
import { stringAsciiCV, uintCV } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

await openContractCall({
  network: new StacksTestnet(),
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: 'trustbill',
  functionName: 'pay-airtime',
  functionArgs: [
    stringAsciiCV('08012345678'),
    uintCV(1000000),
  ],
  onFinish: (data) => {
    console.log('Transaction submitted:', data);
  },
  onCancel: () => {
    console.log('Transaction cancelled');
  },
});
```

#### Programmatic Transactions with @stacks/transactions

For backend services or programmatic interactions without Connect UI:

```typescript
import { TrustBillClient } from './src/trustbill-client.js';
import { StacksTestnet } from '@stacks/network';

const client = new TrustBillClient({
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: 'trustbill',
  network: new StacksTestnet(),
});

// Build and broadcast transaction
const transaction = await client.buildContractCall(
  'pay-airtime',
  [stringAsciiCV('08012345678'), uintCV(1000000)],
  senderPrivateKey
);

const result = await client.broadcastTransaction(
  transaction.serialize().toString('hex')
);
```

#### Query Payment Details

For read-only queries, you can use the Stacks API or a library like `@stacks/blockchain-api-client`:

```typescript
// Example using fetch (replace with your preferred method)
const contractId = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.trustbill';
const functionName = 'get-payment';
const paymentId = 1;

const response = await fetch(
  `https://api.testnet.hiro.so/v2/contracts/call-read/${contractId}/${functionName}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: contractId,
      arguments: [paymentId.toString()],
    }),
  }
);

const payment = await response.json();
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

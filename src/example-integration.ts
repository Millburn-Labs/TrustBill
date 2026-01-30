/**
 * TrustBill Integration Example
 * 
 * Example demonstrating how to use @stacks/connect and @stacks/transactions
 * to interact with the TrustBill contract
 */

import { TrustBillClient, BillType } from './trustbill-client.js';
import {
  showConnect,
  openContractCall,
} from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { stringAsciiCV, uintCV, standardPrincipalCV } from '@stacks/transactions';

/**
 * Example: Connect wallet and create a payment
 */
export async function exampleConnectAndPay() {
  // Initialize the TrustBill client
  const client = new TrustBillClient({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Replace with your contract address
    contractName: 'trustbill',
    network: new StacksTestnet(),
  });

  // Show Connect modal to authenticate user
  showConnect({
    appDetails: {
      name: 'TrustBill',
      icon: 'https://example.com/icon.png',
    },
    redirectTo: '/',
    onFinish: async (payload) => {
      console.log('User authenticated:', payload.userSession?.loadUserData()?.profile?.stxAddress);

      // Example: Create an airtime payment
      await client.payAirtime(
        '08012345678', // Recipient phone number
        1000000, // Amount in micro-STX (1 STX)
        {
          onFinish: (data) => {
            console.log('Payment created:', data);
            // Handle successful payment creation
          },
          onCancel: () => {
            console.log('Payment cancelled');
            // Handle cancellation
          },
        }
      );
    },
    onCancel: () => {
      console.log('User cancelled authentication');
    },
  });
}

/**
 * Example: Process a payment
 */
export async function exampleProcessPayment(paymentId: number) {
  const client = new TrustBillClient({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'trustbill',
    network: new StacksTestnet(),
  });

  await client.processPayment(
    paymentId,
    {
      onFinish: (data) => {
        console.log('Payment processed:', data);
        // Handle successful payment processing
      },
      onCancel: () => {
        console.log('Payment processing cancelled');
      },
    }
  );
}

/**
 * Example: Create multiple bill types
 */
export async function exampleCreateMultipleBills() {
  const client = new TrustBillClient({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'trustbill',
    network: new StacksTestnet(),
  });

  // Create airtime payment
  await client.payAirtime('08012345678', 1000000, {
    onFinish: (data) => console.log('Airtime payment created:', data),
  });

  // Create data subscription payment
  await client.payDataSubscription('08012345678', 2000000, {
    onFinish: (data) => console.log('Data subscription payment created:', data),
  });

  // Create utility payment
  await client.createBillPayment(
    BillType.UTILITY,
    'utility-account-123',
    5000000,
    {
      onFinish: (data) => console.log('Utility payment created:', data),
    }
  );
}

/**
 * Example: Admin functions
 */
export async function exampleAdminFunctions() {
  const client = new TrustBillClient({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'trustbill',
    network: new StacksTestnet(),
  });

  // Update service fee (admin only)
  await client.setServiceFee(10, {
    onFinish: (data) => {
      console.log('Service fee updated to 10%');
    },
  });

  // Register a provider (admin only)
  await client.registerProvider(
    'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    BillType.AIRTIME,
    {
      onFinish: (data) => {
        console.log('Provider registered');
      },
    }
  );
}

/**
 * Example: Using transactions directly (without Connect UI)
 * This is useful for backend services or programmatic interactions
 */
export async function exampleDirectTransaction(
  senderKey: string,
  recipient: string,
  amount: number
) {
  const client = new TrustBillClient({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'trustbill',
    network: new StacksTestnet(),
  });

  // Build the transaction
  const transaction = await client.buildContractCall(
    'pay-airtime',
    [
      stringAsciiCV(recipient),
      uintCV(amount),
    ],
    senderKey
  );

  // Sign and broadcast
  const broadcastResult = await client.broadcastTransaction(
    transaction.serialize().toString('hex')
  );

  console.log('Transaction broadcasted:', broadcastResult);
}

/**
 * Example: Direct contract call using openContractCall
 */
export async function exampleDirectContractCall() {
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
}

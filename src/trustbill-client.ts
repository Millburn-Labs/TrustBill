/**
 * TrustBill Client
 * 
 * Utility functions for interacting with the TrustBill contract
 * using @stacks/connect and @stacks/transactions
 */

import {
  AnchorMode,
  broadcastTransaction,
  makeContractCall,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  standardPrincipalCV,
  ClarityValue,
  StacksTransactionWire,
} from '@stacks/transactions';
import {
  openContractCall,
  ContractCallRegularOptions,
} from '@stacks/connect';
import type { StacksNetwork } from '@stacks/network';
import {
  StacksNetwork as StacksNetworkV6,
  StacksTestnet,
} from '@stacks/network-v6';

/**
 * Contract configuration
 */
export interface TrustBillConfig {
  contractAddress: string;
  contractName: string;
  network?: StacksNetwork | StacksNetworkV6;
}

/**
 * Default contract configuration
 */
export const DEFAULT_CONFIG: TrustBillConfig = {
  contractAddress: '', // Set this to your deployed contract address
  contractName: 'trustbill',
  network: new StacksTestnet(),
};

/**
 * Bill types enum
 */
export enum BillType {
  AIRTIME = 1,
  DATA_SUBSCRIPTION = 2,
  UTILITY = 3,
  OTHER = 4,
}

/**
 * Payment status
 */
export type PaymentStatus = 'pending' | 'completed';

/**
 * Payment record structure
 */
export interface PaymentRecord {
  payer: string;
  'bill-type': bigint;
  amount: bigint;
  recipient?: string;
  'phone-number'?: string;
  timestamp: bigint;
  status: PaymentStatus;
}

/**
 * TrustBill Client Class
 */
export class TrustBillClient {
  private config: TrustBillConfig;

  constructor(config: Partial<TrustBillConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }


  /**
   * Create an airtime payment using Connect
   */
  async payAirtime(
    recipient: string,
    amount: number,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'pay-airtime';
    const functionArgs = [
      stringAsciiCV(recipient),
      uintCV(amount),
    ];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Create a data subscription payment using Connect
   */
  async payDataSubscription(
    recipient: string,
    amount: number,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'pay-data-subscription';
    const functionArgs = [
      stringAsciiCV(recipient),
      uintCV(amount),
    ];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Create a custom bill payment using Connect
   */
  async createBillPayment(
    billType: BillType,
    recipient: string,
    amount: number,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'create-bill-payment';
    const functionArgs = [
      uintCV(billType),
      stringAsciiCV(recipient),
      uintCV(amount),
    ];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Process a payment using Connect
   */
  async processPayment(
    paymentId: number,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'process-payment';
    const functionArgs = [uintCV(paymentId)];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Set service fee (admin only) using Connect
   */
  async setServiceFee(
    newFee: number,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'set-service-fee';
    const functionArgs = [uintCV(newFee)];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Register a provider (admin only) using Connect
   */
  async registerProvider(
    provider: string,
    billType: BillType,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'register-provider';
    const functionArgs = [
      standardPrincipalCV(provider),
      uintCV(billType),
    ];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Set admin (admin only) using Connect
   */
  async setAdmin(
    newAdmin: string,
    options: Omit<ContractCallRegularOptions, 'contractAddress' | 'contractName' | 'functionName' | 'functionArgs' | 'sponsored'>
  ): Promise<void> {
    const functionName = 'set-admin';
    const functionArgs = [standardPrincipalCV(newAdmin)];

    await openContractCall({
      ...options,
      sponsored: false,
      network: this.config.network,
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
    });
  }

  /**
   * Build a contract call transaction (for programmatic use without Connect)
   */
  async buildContractCall(
    functionName: string,
    functionArgs: ClarityValue[],
    senderKey: string,
    nonce?: number
  ) {
    const txOptions = {
      contractAddress: this.config.contractAddress,
      contractName: this.config.contractName,
      functionName,
      functionArgs,
      senderKey,
      network: this.config.network as any,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      fee: 1000, // Default fee, adjust as needed
      nonce,
    };

    return await makeContractCall(txOptions);
  }

  /**
   * Broadcast a signed transaction
   */
  async broadcastTransaction(transaction: StacksTransactionWire) {
    return await broadcastTransaction({
      transaction,
      network: this.config.network as any,
    });
  }
}

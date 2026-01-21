import { describe, expect, it } from "vitest";
import { stringAsciiCV, uintCV, standardPrincipalCV } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;
const deployer = accounts.get("deployer")!;

const contractName = "trustbill";

describe("TrustBill Contract Tests", () => {
  it("ensures simnet is well initialised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  describe("Contract Initialization", () => {
    it("should have deployer as admin", () => {
      const result = simnet.callReadOnlyFn(
        contractName,
        "get-admin",
        [],
        deployer
      );
      expect(result.result).toBePrincipal(deployer);
    });

    it("should have default service fee of 5%", () => {
      const result = simnet.callReadOnlyFn(
        contractName,
        "get-service-fee",
        [],
        deployer
      );
      expect(result.result).toBeUint(5);
    });

    it("should have payment counter starting at 0", () => {
      const result = simnet.callReadOnlyFn(
        contractName,
        "get-payment-counter",
        [],
        deployer
      );
      expect(result.result).toBeUint(0);
    });
  });

  describe("Airtime Payments", () => {
    it("should create an airtime payment", () => {
      const recipient = "08012345678";
      const amount = 1000000; // 1 STX in micro-STX

      const result = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [stringAsciiCV(recipient), uintCV(amount)],
        address1
      );

      expect(result.result).toHaveProperty("value");
      expect(result.result.value).toBeUint(1);

      // Verify payment counter increased
      const counterResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment-counter",
        [],
        address1
      );
      expect(counterResult.result).toBeUint(1);

      // Verify payment details
      const paymentResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment",
        [uintCV(1)],
        address1
      );
      expect(paymentResult.result).toHaveProperty("value");
      const payment = paymentResult.result.value;
      expect(payment.payer).toBePrincipal(address1);
      expect(payment["bill-type"]).toBeUint(1); // BILL-TYPE-AIRTIME
      expect(payment.amount).toBeUint(amount);
      expect(payment.status).toBe("pending");
    });

    it("should reject airtime payment with zero amount", () => {
      const recipient = "08012345678";
      const amount = 0;

      const result = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [stringAsciiCV(recipient), uintCV(amount)],
        address1
      );

      expect(result.result.type).toBe("err");
      expect(result.result.value.value).toBe(2n);
    });
  });

  describe("Data Subscription Payments", () => {
    it("should create a data subscription payment", () => {
      const recipient = "08012345678";
      const amount = 2000000; // 2 STX in micro-STX

      const result = simnet.callPublicFn(
        contractName,
        "pay-data-subscription",
        [stringAsciiCV(recipient), uintCV(amount)],
        address2
      );

      expect(result.result).toHaveProperty("value");
      expect(result.result.value).toBeUint(1);

      // Verify payment details
      const paymentResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment",
        [1],
        address2
      );
      expect(paymentResult.result).toHaveProperty("value");
      const payment = paymentResult.result.value;
      expect(payment.payer).toBePrincipal(address2);
      expect(payment["bill-type"]).toBeUint(2); // BILL-TYPE-DATA
      expect(payment.amount).toBeUint(amount);
      expect(payment.status).toBe("pending");
    });
  });

  describe("Process Payment", () => {
    it("should process a pending payment", () => {
      // First create a payment
      const recipient = "08012345678";
      const amount = 1000000; // 1 STX

      const createResult = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [stringAsciiCV(recipient), uintCV(amount)],
        address1
      );
      expect(createResult.result).toHaveProperty("value");
      const paymentId = createResult.result.value;

      // Process the payment
      const processResult = simnet.callPublicFn(
        contractName,
        "process-payment",
        [uintCV(paymentId)],
        address1
      );
      expect(processResult.result).toHaveProperty("value");

      // Verify payment status changed to completed
      const paymentResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment",
        [paymentId],
        address1
      );
      expect(paymentResult.result).toHaveProperty("value");
      const payment = paymentResult.result.value;
      expect(payment.status).toBe("completed");
    });

    it("should reject processing a payment by non-payer", () => {
      // Create a payment with address1
      const recipient = "08012345678";
      const amount = 1000000;

      const createResult = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [stringAsciiCV(recipient), uintCV(amount)],
        address1
      );
      expect(createResult.result).toBeOk();
      const paymentId = createResult.result.value;

      // Try to process with different address
      const processResult = simnet.callPublicFn(
        contractName,
        "process-payment",
        [uintCV(paymentId)],
        address2
      );
      expect(processResult.result).toBeErr(1); // ERR-UNAUTHORIZED
    });

    it("should reject processing non-existent payment", () => {
      const result = simnet.callPublicFn(
        contractName,
        "process-payment",
        [uintCV(999)],
        address1
      );
      expect(result.result).toHaveProperty("value", 4);
    });

    it("should reject processing already completed payment", () => {
      // Create and process a payment
      const recipient = "08012345678";
      const amount = 1000000;

      const createResult = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [recipient, amount],
        address1
      );
      const paymentId = createResult.result.value;

      // Process once
      const process1 = simnet.callPublicFn(
        contractName,
        "process-payment",
        [paymentId],
        address1
      );
      expect(process1.result).toBeOk();

      // Try to process again
      const process2 = simnet.callPublicFn(
        contractName,
        "process-payment",
        [paymentId],
        address1
      );
      expect(process2.result).toBeErr(6); // ERR-PAYMENT-FAILED (status not pending)
    });
  });

  describe("Custom Bill Payment", () => {
    it("should create a custom bill payment", () => {
      const recipient = "utility-account-123";
      const amount = 5000000; // 5 STX
      const billType = 3; // BILL-TYPE-UTILITY

      const result = simnet.callPublicFn(
        contractName,
        "create-bill-payment",
        [uintCV(billType), stringAsciiCV(recipient), uintCV(amount)],
        address1
      );

      expect(result.result).toHaveProperty("value");
      expect(result.result.value).toBeUint(1);

      // Verify payment details
      const paymentResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment",
        [uintCV(1)],
        address1
      );
      expect(paymentResult.result).toHaveProperty("value");
      const payment = paymentResult.result.value;
      expect(payment["bill-type"]).toBeUint(billType);
      expect(payment.amount).toBeUint(amount);
    });

    it("should reject invalid bill type", () => {
      const recipient = "test";
      const amount = 1000000;

      // Test with bill type 0
      const result1 = simnet.callPublicFn(
        contractName,
        "create-bill-payment",
        [uintCV(0), stringAsciiCV(recipient), uintCV(amount)],
        address1
      );
      expect(result1.result).toBeErr(2); // ERR-INVALID-AMOUNT

      // Test with bill type 5 (out of range)
      const result2 = simnet.callPublicFn(
        contractName,
        "create-bill-payment",
        [uintCV(5), stringAsciiCV(recipient), uintCV(amount)],
        address1
      );
      expect(result2.result).toBeErr(2); // ERR-INVALID-AMOUNT
    });
  });

  describe("Admin Functions", () => {
    it("should allow admin to update service fee", () => {
      const newFee = 10; // 10%

      const result = simnet.callPublicFn(
        contractName,
        "set-service-fee",
        [uintCV(newFee)],
        deployer
      );
      expect(result.result).toHaveProperty("value");

      // Verify fee was updated
      const feeResult = simnet.callReadOnlyFn(
        contractName,
        "get-service-fee",
        [],
        deployer
      );
      expect(feeResult.result).toBeUint(newFee);
    });

    it("should reject service fee update by non-admin", () => {
      const newFee = 10;

      const result = simnet.callPublicFn(
        contractName,
        "set-service-fee",
        [newFee],
        address1
      );
      expect(result.result.type).toBe("err");
      expect(result.result.value.value).toBe(1n);
    });

    it("should reject service fee over 100%", () => {
      const newFee = 101;

      const result = simnet.callPublicFn(
        contractName,
        "set-service-fee",
        [uintCV(newFee)],
        deployer
      );
      expect(result.result.type).toBe("err");
      expect(result.result.value.value).toBe(2n);
    });

    it("should allow admin to register provider", () => {
      const billType = 1; // Airtime

      const result = simnet.callPublicFn(
        contractName,
        "register-provider",
        [standardPrincipalCV(address2), uintCV(billType)],
        deployer
      );
      expect(result.result).toHaveProperty("value");

      // Verify provider is registered
      const checkResult = simnet.callReadOnlyFn(
        contractName,
        "is-provider-registered",
        [address2, billType],
        deployer
      );
      expect(checkResult.result).toBe(true);
    });

    it("should allow admin to change admin", () => {
      const result = simnet.callPublicFn(
        contractName,
        "set-admin",
        [standardPrincipalCV(address1)],
        deployer
      );
      expect(result.result).toHaveProperty("value");

      // Verify admin changed
      const adminResult = simnet.callReadOnlyFn(
        contractName,
        "get-admin",
        [],
        deployer
      );
      expect(adminResult.result).toBePrincipal(address1);
    });

    it("should reject admin change by non-admin", () => {
      const result = simnet.callPublicFn(
        contractName,
        "set-admin",
        [standardPrincipalCV(address2)],
        address1
      );
      expect(result.result.type).toBe("err");
      expect(result.result.value.value).toBe(1n);
    });
  });

  describe("Multiple Payments", () => {
    it("should handle multiple payments with unique IDs", () => {
      const recipient = "08012345678";

      // Create first payment
      const result1 = simnet.callPublicFn(
        contractName,
        "pay-airtime",
        [stringAsciiCV(recipient), uintCV(1000000)],
        address1
      );
      expect(result1.result).toBeOk();
      expect(result1.result.value).toBeUint(1);

      // Create second payment
      const result2 = simnet.callPublicFn(
        contractName,
        "pay-data-subscription",
        [stringAsciiCV(recipient), uintCV(2000000)],
        address1
      );
      expect(result2.result).toBeOk();
      expect(result2.result.value).toBeUint(2);

      // Create third payment
      const result3 = simnet.callPublicFn(
        contractName,
        "create-bill-payment",
        [uintCV(4), stringAsciiCV("test-recipient"), uintCV(3000000)],
        address1
      );
      expect(result3.result).toBeOk();
      expect(result3.result.value).toBeUint(3);

      // Verify payment counter
      const counterResult = simnet.callReadOnlyFn(
        contractName,
        "get-payment-counter",
        [],
        address1
      );
      expect(counterResult.result).toBeUint(3);
    });
  });
});

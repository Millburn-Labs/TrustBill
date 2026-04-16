"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePaymentStore } from "@/store/paymentStore";
import CategorySelect from "./CategorySelect";
import PaymentForm from "./PaymentForm";
import ReviewConfirm from "./ReviewConfirm";
import SuccessScreen from "./SuccessScreen";
import type { BillCategory } from "@/types";
import toast from "react-hot-toast";

const STEPS = ["Category", "Details", "Review", "Done"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === current;
        const isDone = idx < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: isDone
                    ? "var(--color-tb-teal)"
                    : isActive
                    ? "linear-gradient(135deg, #00D4AA, #7C3AED)"
                    : "var(--color-tb-border)",
                  color: isDone || isActive ? "#000" : "var(--color-tb-faint)",
                }}
              >
                {isDone ? "✓" : idx}
              </div>
              <span
                className="text-xs mt-1 hidden sm:block"
                style={{
                  color: isActive
                    ? "var(--color-tb-teal)"
                    : "var(--color-tb-faint)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-8 sm:w-16 h-px mb-5"
                style={{
                  background: isDone
                    ? "var(--color-tb-teal)"
                    : "var(--color-tb-border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const pageVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function PayBillsFlow() {
  const searchParams = useSearchParams();
  const { step, category, formData, txHash, setStep, setCategory, setFormData, setTxHash, reset } =
    usePaymentStore();

  // Pre-select category from URL param
  useEffect(() => {
    const cat = searchParams.get("category") as BillCategory | null;
    if (cat && step === 1) {
      setCategory(cat);
      setStep(2);
    }
  }, [searchParams, step, setCategory, setStep]);

  const handleSelectCategory = (cat: BillCategory) => {
    setCategory(cat);
    setStep(2);
  };

  const handleFormNext = (data: Record<string, string>) => {
    setFormData(data);
    setStep(3);
  };

  const handleConfirm = (hash: string) => {
    setTxHash(hash);
    setStep(4);
    toast.success("Payment confirmed on-chain! 🎉");
  };

  const handlePayAnother = () => {
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator current={step} />

      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: "var(--color-tb-card)",
          border: "1px solid var(--color-tb-border)",
        }}
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <CategorySelect onSelect={handleSelectCategory} />
            </motion.div>
          )}

          {step === 2 && category && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <PaymentForm
                category={category}
                onBack={() => setStep(1)}
                onNext={handleFormNext}
              />
            </motion.div>
          )}

          {step === 3 && category && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <ReviewConfirm
                category={category}
                formData={formData}
                onBack={() => setStep(2)}
                onConfirm={handleConfirm}
              />
            </motion.div>
          )}

          {step === 4 && category && txHash && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <SuccessScreen
                txHash={txHash}
                category={category}
                formData={formData}
                onPayAnother={handlePayAnother}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

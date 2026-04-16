"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is TrustBill?",
    a: "TrustBill is a decentralized bill payment platform built on the Stacks blockchain. It allows users to pay everyday bills — airtime, data, electricity, TV subscriptions, water, and more — using STX tokens, with every transaction permanently recorded on-chain.",
  },
  {
    q: "Which bills can I pay?",
    a: "You can pay for airtime top-ups, data bundles, electricity (prepaid meters), TV subscriptions (DSTV, cable), water bills, rent, internet/broadband subscriptions, and healthcare bills. More categories are added regularly.",
  },
  {
    q: "Which wallet do I need?",
    a: "TrustBill supports Hiro Wallet and Xverse — the two leading Stacks-compatible wallets. Simply install either browser extension or mobile app, fund it with STX, and connect to TrustBill in one click.",
  },
  {
    q: "What happens if my payment fails?",
    a: "If a payment fails at the smart contract level, your STX tokens are never deducted — the transaction is simply reverted. You'll see a failed status with the on-chain transaction ID. Our support team is available to assist if issues persist.",
  },
  {
    q: "Are my payments really on the blockchain?",
    a: "Yes. Every payment creates an immutable on-chain record with a unique transaction hash on the Stacks blockchain. You can verify any payment independently using the Stacks Explorer at explorer.stacks.co.",
  },
  {
    q: "What is the transaction fee?",
    a: "TrustBill charges a transparent 2.5% service fee on each payment, clearly shown before you confirm. Additionally, standard Stacks network gas fees apply (typically very small — a few cents worth of STX).",
  },
  {
    q: "Is TrustBill available in my country?",
    a: "TrustBill is designed primarily for African markets — Nigeria, Ghana, Kenya, South Africa, and 20+ more countries. As a blockchain platform, it's globally accessible to anyone with an internet connection and STX tokens.",
  },
  {
    q: "Can I get a receipt for my payment?",
    a: "Absolutely. Every completed payment generates a downloadable receipt with payment details, transaction hash, timestamp, and recipient info. Your blockchain transaction itself serves as permanent cryptographic proof.",
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ q, a, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--color-tb-card)",
        border: `1px solid ${isOpen ? "rgba(0,212,170,0.3)" : "var(--color-tb-border)"}`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
          style={{ color: isOpen ? "var(--color-tb-teal)" : "var(--color-tb-muted)" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: "var(--color-tb-muted)", borderTop: "1px solid var(--color-tb-border)" }}
            >
              <div className="pt-4">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--color-tb-surface)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--color-tb-teal)" }}
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Got Questions?{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              We&apos;ve Got Answers.
            </span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

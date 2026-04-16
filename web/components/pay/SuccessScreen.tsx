"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight, Download, CheckCircle } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import { shortHash, formatDate } from "@/lib/utils";
import type { BillCategory } from "@/types";

interface Props {
  txHash: string;
  category: BillCategory;
  formData: Record<string, string>;
  onPayAnother: () => void;
}

export default function SuccessScreen({ txHash, category, formData, onPayAnother }: Props) {
  const catMeta = BILL_CATEGORIES.find((c) => c.id === category)!;
  const now = new Date().toISOString();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Checkmark animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative w-24 h-24 mx-auto mb-8"
      >
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "var(--color-tb-teal)" }}
        />
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0, 212, 170, 0.15)", border: "2px solid var(--color-tb-teal)" }}
        >
          <CheckCircle className="w-12 h-12" style={{ color: "var(--color-tb-teal)" }} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
        <p className="mb-8" style={{ color: "var(--color-tb-muted)" }}>
          Your {catMeta.label} payment has been confirmed on-chain.
        </p>
      </motion.div>

      {/* Receipt card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-left rounded-2xl mb-8 overflow-hidden"
        style={{
          background: "var(--color-tb-surface)",
          border: "1px solid rgba(0,212,170,0.3)",
        }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: "var(--color-tb-border)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{catMeta.icon}</span>
              <span className="font-semibold">{catMeta.label} Payment</span>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium status-confirmed"
            >
              ✓ Confirmed
            </span>
          </div>
        </div>

        <div className="px-6 py-4 space-y-3">
          {[
            { label: "Recipient", value: formData.recipient },
            { label: "Amount", value: `${formData.amount} STX` },
            { label: "Date", value: formatDate(now) },
            { label: "Transaction Hash", value: shortHash(txHash), mono: true },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
                {label}
              </span>
              <span
                className={`text-sm font-medium ${mono ? "font-mono text-xs" : ""}`}
                style={{ color: mono ? "var(--color-tb-teal)" : "var(--color-tb-text)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={onPayAnother}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold btn-teal"
        >
          Pay Another Bill
          <ArrowRight className="w-4 h-4" />
        </button>
        <a
          href={`https://explorer.stacks.co/txid/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold btn-outline"
        >
          View on Explorer
          <ExternalLink className="w-4 h-4" />
        </a>
        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold btn-outline"
        >
          <Download className="w-4 h-4" />
          View Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { Link2, Lock, Zap, Globe, FileText, Coins } from "lucide-react";

const FEATURES = [
  {
    icon: Link2,
    title: "On-Chain Proof",
    description:
      "Every payment is verifiably recorded on Stacks blockchain — permanent, public, and cryptographically secured.",
    color: "#00D4AA",
  },
  {
    icon: Lock,
    title: "Non-Custodial",
    description:
      "You always control your funds. No middlemen, no escrow, no counterparty risk. Just pure peer-to-contract payments.",
    color: "#7C3AED",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description:
      "Payments confirmed in seconds via the Stacks network. No waiting days for bank clearing or international wires.",
    color: "#F59E0B",
  },
  {
    icon: Globe,
    title: "Built for Africa",
    description:
      "Designed for real bills Africans pay every day — airtime, data, DSTV, PHCN, water, and more.",
    color: "#10B981",
  },
  {
    icon: FileText,
    title: "Immutable Receipts",
    description:
      "Payment records that can never be altered or lost. Download, share, or verify any transaction on-chain.",
    color: "#3B82F6",
  },
  {
    icon: Coins,
    title: "STX Powered",
    description:
      "Leverage Stacks' unique security model — every transaction is anchored to Bitcoin, the most secure blockchain.",
    color: "#EC4899",
  },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--color-tb-bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--color-tb-teal)" }}
          >
            Why TrustBill
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Built Different.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              By Design.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-tb-muted)" }}
          >
            TrustBill was engineered from the ground up for transparency, security,
            and real-world utility.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl group transition-all duration-300"
                style={{
                  background: "var(--color-tb-card)",
                  border: "1px solid var(--color-tb-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${feat.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 32px ${feat.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-tb-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-tb-muted)" }}>
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

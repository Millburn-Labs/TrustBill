"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)",
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      {/* Border */}
      <div
        className="absolute inset-0"
        style={{
          borderTop: "1px solid rgba(0, 212, 170, 0.2)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: "rgba(0, 212, 170, 0.1)",
            border: "1px solid rgba(0, 212, 170, 0.2)",
            color: "var(--color-tb-teal)",
          }}
        >
          <Users className="w-4 h-4" />
          Join 12,540+ wallets already paying on-chain
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          Start Paying Bills the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Web3 Way
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-12 max-w-2xl mx-auto"
          style={{ color: "var(--color-tb-muted)" }}
        >
          Join thousands using TrustBill to pay bills transparently on Stacks.
          Secure. Fast. On-chain forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/pay"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-teal group"
          >
            Connect Wallet & Pay Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg btn-outline"
          >
            Learn How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

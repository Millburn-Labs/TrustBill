"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Link2, Zap, Globe } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { PROTOCOL_STATS } from "@/lib/mockData";

const TRUST_BADGES = [
  { icon: Lock, label: "Non-Custodial" },
  { icon: Link2, label: "On-Chain Proof" },
  { icon: Zap, label: "Instant Settlement" },
  { icon: Globe, label: "Pan-African Ready" },
];

const STAT_ITEMS = [
  {
    label: "Bills Paid",
    value: PROTOCOL_STATS.totalBillsPaid,
    suffix: "+",
    prefix: "",
  },
  {
    label: "STX Processed",
    value: PROTOCOL_STATS.totalSTXProcessed,
    suffix: "M+",
    prefix: "",
  },
  {
    label: "Active Wallets",
    value: PROTOCOL_STATS.activeWallets,
    suffix: "+",
    prefix: "",
  },
  {
    label: "Services",
    value: PROTOCOL_STATS.countriesSupported,
    suffix: "+",
    prefix: "",
  },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--color-tb-bg)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(0, 212, 170, 0.08)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(124, 58, 237, 0.08)" }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: "rgba(0, 212, 170, 0.1)",
              border: "1px solid rgba(0, 212, 170, 0.2)",
              color: "var(--color-tb-teal)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            Live on Stacks Mainnet
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Pay Every Bill.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trust Every
              <br />
              Transaction.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--color-tb-muted)" }}
          >
            The first decentralized bill payment platform on Stacks — pay airtime,
            data, utilities and more with STX.{" "}
            <strong style={{ color: "var(--color-tb-text)" }}>
              Transparent. Immutable. Yours.
            </strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <Link
              href="/pay"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base btn-teal group"
            >
              Pay a Bill Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base btn-outline"
            >
              Explore Dashboard
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-20"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "var(--color-tb-surface)",
                  border: "1px solid var(--color-tb-border)",
                  color: "var(--color-tb-muted)",
                }}
              >
                <Icon className="w-4 h-4" style={{ color: "var(--color-tb-teal)" }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STAT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-2xl glass-card"
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "var(--color-tb-teal)" }}
              >
                <AnimatedCounter
                  target={item.value}
                  suffix={item.suffix}
                  prefix={item.prefix}
                />
              </div>
              <div className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

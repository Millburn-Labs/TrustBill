"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { PROTOCOL_STATS } from "@/lib/mockData";

const STATS = [
  {
    label: "Total Bills Processed",
    value: PROTOCOL_STATS.totalBillsPaid,
    suffix: "+",
    prefix: "",
    color: "#00D4AA",
  },
  {
    label: "Total STX Volume",
    value: PROTOCOL_STATS.totalSTXProcessed / 1_000_000,
    suffix: "M+ STX",
    prefix: "",
    decimals: 1,
    color: "#7C3AED",
  },
  {
    label: "Unique Wallets",
    value: PROTOCOL_STATS.activeWallets,
    suffix: "+",
    prefix: "",
    color: "#10B981",
  },
  {
    label: "Countries Supported",
    value: PROTOCOL_STATS.countriesSupported,
    suffix: "",
    prefix: "",
    color: "#F59E0B",
  },
];

export default function ProtocolStats() {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "var(--color-tb-bg)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 grid-overlay pointer-events-none opacity-50"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(0, 212, 170, 0.04)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--color-tb-teal)" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--color-tb-teal)" }}
            />
            Live Protocol Stats
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Numbers That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Don&apos;t Lie
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl text-center glass-card group"
              style={{
                border: "1px solid var(--color-tb-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${stat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-tb-border)";
              }}
            >
              <div
                className="flex items-center justify-center gap-2 mb-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: stat.color }}
                />
              </div>
              <div
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Wallet, FileInput, CheckCircle, ExternalLink } from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: Wallet,
    title: "Connect Wallet",
    description:
      "Link your Hiro Wallet or Xverse in one click. No account creation — just your wallet address.",
    color: "#00D4AA",
  },
  {
    step: 2,
    icon: FileInput,
    title: "Choose & Enter Details",
    description:
      "Select your bill type and fill in recipient info — phone number, meter number, or account reference.",
    color: "#7C3AED",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Confirm & Done",
    description:
      "Approve in your wallet. STX transferred instantly. Receipt recorded on-chain forever.",
    color: "#10B981",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--color-tb-surface)" }}
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
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Three Steps to Pay Any Bill{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              On-Chain
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-px"
            style={{
              background:
                "linear-gradient(90deg, #00D4AA, #7C3AED, #10B981)",
              opacity: 0.3,
            }}
          />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: step.color, color: "#000" }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-tb-muted)" }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Explorer link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-3" style={{ color: "var(--color-tb-muted)" }}>
            Every transaction is publicly verifiable on the Stacks blockchain
          </p>
          <a
            href="https://explorer.stacks.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--color-tb-teal)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-tb-teal-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-tb-teal)")
            }
          >
            View on Stacks Explorer
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";

export default function BillCategories() {
  return (
    <section
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
            Bill Categories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Everything You Pay For,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Now On-Chain
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
            From airtime top-ups to utility bills — all your everyday payments,
            secured by the Stacks blockchain.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/pay?category=${cat.id}`}
                className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 block"
                style={{
                  background: "var(--color-tb-card)",
                  border: "1px solid var(--color-tb-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.boxShadow = `0 0 24px ${cat.color}20, 0 0 48px ${cat.color}08`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-tb-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: "var(--color-tb-text)" }}>
                    {cat.label}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
                    {cat.description}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1 text-sm font-medium mt-auto transition-colors"
                  style={{ color: cat.color }}
                >
                  Pay Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

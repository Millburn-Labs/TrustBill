"use client";
import { motion } from "framer-motion";
import { Receipt, TrendingUp, Star, Clock } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";
import { formatSTX, formatDateShort, categoryLabel } from "@/lib/utils";

function getStats() {
  const confirmed = MOCK_TRANSACTIONS.filter((t) => t.status === "confirmed");
  const thisMonth = confirmed.filter(
    (t) => new Date(t.date).getMonth() === new Date().getMonth()
  );
  const byCategory = confirmed.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
  const mostUsed = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0];
  const lastPayment = confirmed.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return {
    totalPaid: confirmed.length,
    stxThisMonth: thisMonth.reduce((s, t) => s + t.amountSTX, 0),
    mostUsed: mostUsed ?? "—",
    lastPaymentDate: lastPayment?.date ?? null,
  };
}

const CARDS = [
  {
    icon: Receipt,
    label: "Total Bills Paid",
    getValue: (s: ReturnType<typeof getStats>) => s.totalPaid.toString(),
    color: "#00D4AA",
    suffix: " all time",
  },
  {
    icon: TrendingUp,
    label: "STX Spent This Month",
    getValue: (s: ReturnType<typeof getStats>) => formatSTX(s.stxThisMonth),
    color: "#7C3AED",
    suffix: "",
  },
  {
    icon: Star,
    label: "Most Used Service",
    getValue: (s: ReturnType<typeof getStats>) => categoryLabel(s.mostUsed as never),
    color: "#F59E0B",
    suffix: "",
  },
  {
    icon: Clock,
    label: "Last Payment",
    getValue: (s: ReturnType<typeof getStats>) =>
      s.lastPaymentDate ? formatDateShort(s.lastPaymentDate) : "—",
    color: "#10B981",
    suffix: "",
  },
];

export default function SummaryCards() {
  const stats = getStats();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const value = card.getValue(stats);
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl"
            style={{
              background: "var(--color-tb-card)",
              border: "1px solid var(--color-tb-border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${card.color}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-muted)" }}>
              {card.label}
            </p>
            <p className="text-xl font-bold" style={{ color: "var(--color-tb-text)" }}>
              {value}
            </p>
            {card.suffix && (
              <p className="text-xs mt-0.5" style={{ color: "var(--color-tb-faint)" }}>
                {card.suffix}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

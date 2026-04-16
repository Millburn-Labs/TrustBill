"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import type { BillCategory } from "@/types";

interface Props {
  onSelect: (cat: BillCategory) => void;
}

export default function CategorySelect({ onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filtered = BILL_CATEGORIES.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Choose a Bill Category</h2>
      <p className="mb-6 text-sm" style={{ color: "var(--color-tb-muted)" }}>
        Select the type of bill you want to pay
      </p>

      {/* Search */}
      <div className="relative mb-8">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: "var(--color-tb-faint)" }}
        />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12" style={{ color: "var(--color-tb-muted)" }}>
          No services found for &quot;{search}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(cat.id)}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 group"
              style={{
                background: "var(--color-tb-surface)",
                border: "1px solid var(--color-tb-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cat.color;
                e.currentTarget.style.boxShadow = `0 0 20px ${cat.color}20`;
                e.currentTarget.style.transform = "translateY(-2px)";
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
                <p className="font-semibold text-sm">{cat.label}</p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-tb-muted)" }}
                >
                  {cat.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

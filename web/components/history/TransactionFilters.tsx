"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import type { BillCategory, TxStatus } from "@/types";

export interface FilterState {
  search: string;
  category: BillCategory | "all";
  status: TxStatus | "all";
  minAmount: string;
  maxAmount: string;
  dateFrom: string;
  dateTo: string;
}

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "all",
  status: "all",
  minAmount: "",
  maxAmount: "",
  dateFrom: "",
  dateTo: "",
};

export default function TransactionFilters({ filters, onChange, onReset }: Props) {
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.search ||
    filters.minAmount ||
    filters.maxAmount ||
    filters.dateFrom ||
    filters.dateTo;

  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div
      className="p-5 rounded-2xl mb-6"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4" style={{ color: "var(--color-tb-teal)" }} />
        <span className="text-sm font-semibold">Filter Transactions</span>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto flex items-center gap-1 text-xs transition-colors"
            style={{ color: "var(--color-tb-error)" }}
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--color-tb-faint)" }}
          />
          <input
            type="text"
            placeholder="Search recipient, TX hash..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className="input-field pl-9 text-sm"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className="input-field text-sm"
          style={{ color: filters.category !== "all" ? "var(--color-tb-text)" : "var(--color-tb-faint)" }}
        >
          <option value="all">All Categories</option>
          {BILL_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id} style={{ background: "var(--color-tb-card)" }}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="input-field text-sm"
          style={{ color: filters.status !== "all" ? "var(--color-tb-text)" : "var(--color-tb-faint)" }}
        >
          <option value="all">All Statuses</option>
          <option value="confirmed" style={{ background: "var(--color-tb-card)" }}>Confirmed</option>
          <option value="pending" style={{ background: "var(--color-tb-card)" }}>Pending</option>
          <option value="failed" style={{ background: "var(--color-tb-card)" }}>Failed</option>
        </select>

        {/* Amount range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min STX"
            value={filters.minAmount}
            onChange={(e) => update("minAmount", e.target.value)}
            className="input-field text-sm flex-1 min-w-0"
          />
          <input
            type="number"
            placeholder="Max STX"
            value={filters.maxAmount}
            onChange={(e) => update("maxAmount", e.target.value)}
            className="input-field text-sm flex-1 min-w-0"
          />
        </div>

        {/* Date range */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => update("dateFrom", e.target.value)}
          className="input-field text-sm"
          style={{ colorScheme: "dark" }}
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => update("dateTo", e.target.value)}
          className="input-field text-sm"
          style={{ colorScheme: "dark" }}
        />
      </div>
    </div>
  );
}

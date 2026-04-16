"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Download, FileText, InboxIcon } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import { formatSTX, formatUSD, formatDate, shortHash, downloadCSV } from "@/lib/utils";
import type { Transaction, TxStatus } from "@/types";

function StatusBadge({ status }: { status: TxStatus }) {
  const map: Record<TxStatus, { label: string; cls: string }> = {
    confirmed: { label: "✓ Confirmed", cls: "status-confirmed" },
    pending: { label: "⏳ Pending", cls: "status-pending" },
    failed: { label: "✗ Failed", cls: "status-failed" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>
      {label}
    </span>
  );
}

function ExpandedRow({ tx }: { tx: Transaction }) {
  const cat = BILL_CATEGORIES.find((c) => c.id === tx.category);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div
        className="px-6 py-4 grid sm:grid-cols-3 gap-4 text-sm"
        style={{
          background: "rgba(0,212,170,0.03)",
          borderTop: "1px solid var(--color-tb-border)",
        }}
      >
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            Full TX Hash
          </p>
          <a
            href={`https://explorer.stacks.co/txid/${tx.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs break-all flex items-start gap-1 transition-colors"
            style={{ color: "var(--color-tb-teal)" }}
          >
            {tx.txHash}
            <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            Category
          </p>
          <p className="flex items-center gap-2">
            <span>{cat?.icon}</span>
            <span>{cat?.label}</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            Date & Time
          </p>
          <p>{formatDate(tx.date)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            Recipient
          </p>
          <p className="font-mono">{tx.recipient}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            Amount STX
          </p>
          <p className="font-semibold" style={{ color: "var(--color-tb-teal)" }}>
            {formatSTX(tx.amountSTX)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-tb-faint)" }}>
            USD Value
          </p>
          <p>{formatUSD(tx.amountUSD)}</p>
        </div>
      </div>
    </motion.div>
  );
}

const PAGE_SIZE = 5;

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paginated = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExportCSV = () => {
    const rows = transactions.map((tx) => ({
      Date: formatDate(tx.date),
      Service: tx.service,
      Category: tx.category,
      Recipient: tx.recipient,
      "Amount (STX)": tx.amountSTX,
      "Amount (USD)": tx.amountUSD,
      Status: tx.status,
      "TX Hash": tx.txHash,
    }));
    downloadCSV(rows, "trustbill-transactions.csv");
  };

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
        style={{
          background: "var(--color-tb-card)",
          border: "1px solid var(--color-tb-border)",
          borderRadius: "16px",
        }}
      >
        <InboxIcon className="w-16 h-16 mb-4" style={{ color: "var(--color-tb-faint)" }} />
        <h3 className="text-xl font-semibold mb-2">No Transactions Found</h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-tb-muted)" }}>
          No transactions match your filters. Try adjusting them.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Export */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all btn-outline"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          background: "var(--color-tb-card)",
          border: "1px solid var(--color-tb-border)",
        }}
      >
        {/* Desktop */}
        <div className="hidden sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-tb-border)" }}>
                {["Date", "Service", "Recipient", "Amount", "Status", "TX Hash", ""].map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--color-tb-faint)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx, i) => {
                const cat = BILL_CATEGORIES.find((c) => c.id === tx.category);
                const isExpanded = expandedId === tx.id;
                return (
                  <>
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b cursor-pointer transition-colors"
                      style={{ borderColor: "var(--color-tb-border)" }}
                      onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.02)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <td className="px-5 py-4" style={{ color: "var(--color-tb-muted)" }}>
                        {formatDate(tx.date).split(",")[0]}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span>{cat?.icon}</span>
                          <span className="font-medium">{tx.service}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs" style={{ color: "var(--color-tb-muted)" }}>
                        {tx.recipient}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{formatSTX(tx.amountSTX)}</p>
                        <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                          {formatUSD(tx.amountUSD)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="font-mono text-xs"
                          style={{ color: "var(--color-tb-teal)" }}
                        >
                          {shortHash(tx.txHash)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            className="w-4 h-4"
                            style={{ color: "var(--color-tb-faint)" }}
                          />
                        </motion.div>
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {isExpanded && (
                        <tr key={`${tx.id}-expanded`}>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <ExpandedRow tx={tx} />
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="sm:hidden divide-y" style={{ borderColor: "var(--color-tb-border)" }}>
          {paginated.map((tx) => {
            const cat = BILL_CATEGORIES.find((c) => c.id === tx.category);
            const isExpanded = expandedId === tx.id;
            return (
              <div key={tx.id}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{cat?.icon}</span>
                      <span className="font-medium text-sm">{tx.service}</span>
                    </div>
                    <StatusBadge status={tx.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                      {formatDate(tx.date).split(",")[0]} · {tx.recipient}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-tb-teal)" }}>
                      {formatSTX(tx.amountSTX)}
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && <ExpandedRow tx={tx} />}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm btn-outline disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-8 h-8 rounded-lg text-sm font-medium transition-all"
              style={{
                background: p === page ? "rgba(0,212,170,0.15)" : "transparent",
                border: `1px solid ${p === page ? "var(--color-tb-teal)" : "var(--color-tb-border)"}`,
                color: p === page ? "var(--color-tb-teal)" : "var(--color-tb-muted)",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm btn-outline disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

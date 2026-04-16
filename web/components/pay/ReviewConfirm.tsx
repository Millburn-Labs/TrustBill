"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Link2, AlertCircle } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import { useSTXPrice } from "@/hooks/useSTXPrice";
import { useWalletStore } from "@/store/walletStore";
import { formatSTX, formatUSD, truncateAddress } from "@/lib/utils";
import type { BillCategory } from "@/types";

interface Props {
  category: BillCategory;
  formData: Record<string, string>;
  onBack: () => void;
  onConfirm: (txHash: string) => void;
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b"
      style={{ borderColor: "var(--color-tb-border)" }}
    >
      <span className="text-sm" style={{ color: "var(--color-tb-muted)" }}>{label}</span>
      <span
        className={`text-sm font-medium ${mono ? "font-mono" : ""}`}
        style={{ color: "var(--color-tb-text)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ReviewConfirm({ category, formData, onBack, onConfirm }: Props) {
  const [processing, setProcessing] = useState(false);
  const { usd } = useSTXPrice();
  const { connected, address } = useWalletStore();

  const catMeta = BILL_CATEGORIES.find((c) => c.id === category)!;
  const amountSTX = parseFloat(formData.amount || "0");
  const serviceFeeSTX = amountSTX * 0.025;
  const totalSTX = amountSTX + serviceFeeSTX;
  const totalUSD = totalSTX * usd;

  const handleConfirm = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    const fakeTxHash =
      "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    onConfirm(fakeTxHash);
    setProcessing(false);
  };

  const getRecipientLabel = () => {
    if (category === "airtime" || category === "data") return formData.network ? `${formData.network} — ${formData.recipient}` : formData.recipient;
    return formData.recipient;
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-6 transition-colors"
        style={{ color: "var(--color-tb-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-tb-teal)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-tb-muted)")}
      >
        <ArrowLeft className="w-4 h-4" />
        Edit payment details
      </button>

      <h2 className="text-2xl font-bold mb-2">Review & Confirm</h2>
      <p className="text-sm mb-8" style={{ color: "var(--color-tb-muted)" }}>
        Verify the details below before confirming your payment
      </p>

      {/* Summary card */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background: "var(--color-tb-surface)",
          border: "1px solid var(--color-tb-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 p-5 border-b"
          style={{ borderColor: "var(--color-tb-border)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${catMeta.color}15` }}
          >
            {catMeta.icon}
          </div>
          <div>
            <p className="font-semibold">{catMeta.label}</p>
            <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
              {catMeta.description}
            </p>
          </div>
        </div>

        {/* Rows */}
        <div className="px-5">
          <Row label="Service" value={catMeta.label} />
          <Row label="Recipient" value={getRecipientLabel()} />
          {formData.tvPackage && <Row label="Package" value={formData.tvPackage} />}
          {formData.bundle && <Row label="Bundle" value={formData.bundle} />}
          {connected && address && <Row label="From Wallet" value={truncateAddress(address, 8)} mono />}
          <Row label="Amount" value={formatSTX(amountSTX)} />
          <Row label="Service Fee (2.5%)" value={formatSTX(serviceFeeSTX)} />
          <div className="flex items-center justify-between py-4">
            <span className="font-semibold">Total</span>
            <div className="text-right">
              <p className="font-bold text-lg" style={{ color: "var(--color-tb-teal)" }}>
                {formatSTX(totalSTX)}
              </p>
              <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                {formatUSD(totalUSD)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* On-chain notice */}
      <div
        className="flex gap-3 p-4 rounded-xl mb-6"
        style={{
          background: "rgba(0, 212, 170, 0.05)",
          border: "1px solid rgba(0, 212, 170, 0.15)",
        }}
      >
        <Link2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-tb-teal)" }} />
        <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
          <strong style={{ color: "var(--color-tb-teal)" }}>On-chain proof: </strong>
          This payment will be permanently and immutably recorded on the Stacks blockchain.
        </p>
      </div>

      {!connected && (
        <div
          className="flex gap-3 p-4 rounded-xl mb-6"
          style={{
            background: "rgba(245, 158, 11, 0.05)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-tb-warning)" }} />
          <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
            <strong style={{ color: "var(--color-tb-warning)" }}>Wallet not connected. </strong>
            Please connect your Hiro or Xverse wallet to confirm payment.
          </p>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={processing}
        className="w-full py-4 rounded-xl font-semibold btn-teal disabled:opacity-70 disabled:cursor-wait"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Waiting for wallet confirmation...
          </span>
        ) : (
          "Confirm & Pay"
        )}
      </button>
    </div>
  );
}

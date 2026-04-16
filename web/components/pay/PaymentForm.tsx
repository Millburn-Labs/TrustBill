"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BILL_CATEGORIES } from "@/lib/mockData";
import { useSTXPrice } from "@/hooks/useSTXPrice";
import type { BillCategory } from "@/types";

const TV_PACKAGES = ["DStv Padi", "DStv Access", "DStv Family", "DStv Compact", "DStv Premium"];
const NETWORKS = ["MTN", "Airtel", "Glo", "9mobile"];
const DATA_BUNDLES: Record<string, { label: string; stx: number }[]> = {
  MTN: [
    { label: "1GB — 30 days", stx: 5 },
    { label: "2GB — 30 days", stx: 9 },
    { label: "5GB — 30 days", stx: 20 },
    { label: "10GB — 30 days", stx: 35 },
  ],
  Airtel: [
    { label: "1.5GB — 30 days", stx: 6 },
    { label: "3GB — 30 days", stx: 11 },
    { label: "6GB — 30 days", stx: 20 },
  ],
  Glo: [{ label: "2.9GB — 30 days", stx: 7 }, { label: "7.7GB — 30 days", stx: 18 }],
  "9mobile": [{ label: "1GB — 30 days", stx: 5 }, { label: "2.5GB — 30 days", stx: 10 }],
};

const schema = z.object({
  recipient: z.string().min(5, "Required — at least 5 characters"),
  network: z.string().optional(),
  bundle: z.string().optional(),
  tvPackage: z.string().optional(),
  amount: z.string().min(1, "Amount is required").refine(
    (v) => !isNaN(Number(v)) && Number(v) > 0,
    "Enter a valid STX amount"
  ),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  category: BillCategory;
  onBack: () => void;
  onNext: (data: Record<string, string>) => void;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs mt-1.5" style={{ color: "var(--color-tb-error)" }}>
      {message}
    </p>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-tb-muted)" }}>
      {children}
      {required && <span className="ml-0.5" style={{ color: "var(--color-tb-error)" }}>*</span>}
    </label>
  );
}

export default function PaymentForm({ category, onBack, onNext }: Props) {
  const { usd, loading: priceLoading } = useSTXPrice();
  const catMeta = BILL_CATEGORIES.find((c) => c.id === category)!;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { network: NETWORKS[0] },
  });

  const selectedNetwork = watch("network") ?? NETWORKS[0];
  const selectedBundle = watch("bundle");
  const amountSTX = parseFloat(watch("amount") || "0");
  const amountUSD = !isNaN(amountSTX) ? amountSTX * usd : 0;

  const getRecipientLabel = () => {
    if (category === "airtime" || category === "data") return "Phone Number";
    if (category === "electricity") return "Meter Number";
    if (category === "tv") return "Smartcard / IUC Number";
    if (category === "water") return "Account Number";
    if (category === "rent") return "Property Reference";
    if (category === "internet") return "Account / Reference Number";
    if (category === "healthcare") return "Patient / Bill Reference";
    return "Recipient / Reference";
  };

  const getRecipientPlaceholder = () => {
    if (category === "airtime" || category === "data") return "+234 800 000 0000";
    if (category === "electricity") return "45028712938";
    if (category === "tv") return "1234567890";
    if (category === "water") return "WB-00192837";
    if (category === "internet") return "ACC-789456123";
    return "Enter reference...";
  };

  const onSubmit = (data: FormValues) => {
    onNext({
      category,
      recipient: data.recipient,
      network: data.network ?? "",
      bundle: data.bundle ?? "",
      tvPackage: data.tvPackage ?? "",
      amount: data.amount,
    });
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
        Back to categories
      </button>

      {/* Category badge */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${catMeta.color}15` }}
        >
          {catMeta.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{catMeta.label}</h2>
          <p className="text-sm" style={{ color: "var(--color-tb-muted)" }}>
            {catMeta.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Network selector for airtime/data */}
        {(category === "airtime" || category === "data") && (
          <div>
            <Label required>Network Provider</Label>
            <div className="grid grid-cols-4 gap-2">
              {NETWORKS.map((net) => (
                <label key={net} className="cursor-pointer">
                  <input
                    type="radio"
                    value={net}
                    {...register("network")}
                    className="sr-only"
                  />
                  <div
                    className="text-center py-2.5 px-3 rounded-xl text-sm font-medium border transition-all cursor-pointer"
                    style={{
                      background:
                        selectedNetwork === net
                          ? "rgba(0,212,170,0.1)"
                          : "var(--color-tb-surface)",
                      borderColor:
                        selectedNetwork === net
                          ? "var(--color-tb-teal)"
                          : "var(--color-tb-border)",
                      color:
                        selectedNetwork === net
                          ? "var(--color-tb-teal)"
                          : "var(--color-tb-muted)",
                    }}
                  >
                    {net}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Data bundle selector */}
        {category === "data" && (
          <div>
            <Label required>Select Bundle</Label>
            <div className="space-y-2">
              {(DATA_BUNDLES[selectedNetwork] ?? []).map((bundle) => (
                <label key={bundle.label} className="cursor-pointer">
                  <input
                    type="radio"
                    value={bundle.stx.toString()}
                    {...register("bundle")}
                    className="sr-only"
                  />
                  <div
                    className="flex items-center justify-between p-3 rounded-xl border transition-all"
                    style={{
                      background:
                        selectedBundle === bundle.stx.toString()
                          ? "rgba(0,212,170,0.08)"
                          : "var(--color-tb-surface)",
                      borderColor:
                        selectedBundle === bundle.stx.toString()
                          ? "var(--color-tb-teal)"
                          : "var(--color-tb-border)",
                    }}
                  >
                    <span className="text-sm font-medium">{bundle.label}</span>
                    <span className="text-sm font-bold" style={{ color: "var(--color-tb-teal)" }}>
                      {bundle.stx} STX
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* TV Package selector */}
        {category === "tv" && (
          <div>
            <Label>Package (Optional)</Label>
            <select {...register("tvPackage")} className="input-field">
              <option value="">Select package...</option>
              {TV_PACKAGES.map((p) => (
                <option key={p} value={p} style={{ background: "var(--color-tb-card)" }}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Recipient */}
        <div>
          <Label required>{getRecipientLabel()}</Label>
          <div className="relative">
            <input
              type="text"
              placeholder={getRecipientPlaceholder()}
              {...register("recipient")}
              className={`input-field pr-10 ${errors.recipient ? "input-error" : ""}`}
            />
            {!errors.recipient && watch("recipient")?.length >= 5 && (
              <CheckCircle2
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "var(--color-tb-success)" }}
              />
            )}
          </div>
          <FieldError message={errors.recipient?.message} />
        </div>

        {/* Amount */}
        {category !== "data" && (
          <div>
            <Label required>Amount (STX)</Label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                {...register("amount")}
                className={`input-field pr-16 ${errors.amount ? "input-error" : ""}`}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium"
                style={{ color: "var(--color-tb-faint)" }}
              >
                STX
              </span>
            </div>
            {!priceLoading && amountSTX > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs mt-1.5"
                style={{ color: "var(--color-tb-teal)" }}
              >
                ≈ ${amountUSD.toFixed(2)} USD
              </motion.p>
            )}
            <FieldError message={errors.amount?.message} />
          </div>
        )}

        {/* Hidden amount for data */}
        {category === "data" && <input type="hidden" {...register("amount")} value={selectedBundle ?? ""} />}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-4 rounded-xl font-semibold btn-teal disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Review Payment
        </button>
      </form>
    </div>
  );
}

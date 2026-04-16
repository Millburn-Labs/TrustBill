import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PayBillsFlow from "@/components/pay/PayBillsFlow";

export const metadata = {
  title: "Pay Bills — TrustBill",
  description: "Pay airtime, data, utilities and more on-chain with STX tokens.",
};

export default function PayPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "var(--color-tb-bg)" }}
      >
        {/* Page header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Pay a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bill
            </span>
          </h1>
          <p className="text-lg" style={{ color: "var(--color-tb-muted)" }}>
            Secure, transparent, and on-chain. Every payment verifiable on Stacks.
          </p>
        </div>

        <Suspense fallback={<div />}>
          <PayBillsFlow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

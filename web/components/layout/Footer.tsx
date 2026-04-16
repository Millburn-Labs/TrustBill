"use client";
import Link from "next/link";
import { Shield, Zap, X, Code2, MessageCircle, Send, Copy, ExternalLink } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/mockData";
import toast from "react-hot-toast";

const FOOTER_LINKS = {
  Product: [
    { label: "Pay Bills", href: "/pay" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Transaction History", href: "/history" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Smart Contract", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Stacks Explorer", href: "https://explorer.stacks.co", external: true },
  ],
  Community: [
    { label: "Twitter / X", href: "#" },
    { label: "Discord", href: "#" },
    { label: "Telegram", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { icon: X, href: "#", label: "Twitter / X" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Send, href: "#", label: "Telegram" },
];

export default function Footer() {
  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast.success("Contract address copied!");
  };

  return (
    <footer
      style={{
        background: "var(--color-tb-surface)",
        borderTop: "1px solid var(--color-tb-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg relative"
                style={{ background: "linear-gradient(135deg, #00D4AA, #7C3AED)" }}
              >
                <Shield className="w-4 h-4 text-white absolute" />
                <Zap className="w-3 h-3 text-white absolute" style={{ marginTop: "1px" }} />
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TrustBill
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-tb-muted)" }}>
              Decentralized Payments.<br />Real World Impact.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                  style={{
                    background: "var(--color-tb-card)",
                    border: "1px solid var(--color-tb-border)",
                    color: "var(--color-tb-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-tb-teal)";
                    e.currentTarget.style.color = "var(--color-tb-teal)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-tb-border)";
                    e.currentTarget.style.color = "var(--color-tb-muted)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-sm font-semibold mb-4 uppercase tracking-wider"
                style={{ color: "var(--color-tb-text)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm flex items-center gap-1 transition-colors"
                      style={{ color: "var(--color-tb-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-tb-teal)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-tb-muted)";
                      }}
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contract address */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl mb-8"
          style={{
            background: "var(--color-tb-card)",
            border: "1px solid var(--color-tb-border)",
          }}
        >
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-tb-muted)" }}>
            Smart Contract
          </span>
          <code
            className="flex-1 text-sm font-mono break-all"
            style={{ color: "var(--color-tb-teal)" }}
          >
            {CONTRACT_ADDRESS}
          </code>
          <button
            onClick={handleCopyContract}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all shrink-0"
            style={{
              border: "1px solid var(--color-tb-border)",
              color: "var(--color-tb-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-tb-teal)";
              e.currentTarget.style.color = "var(--color-tb-teal)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-tb-border)";
              e.currentTarget.style.color = "var(--color-tb-muted)";
            }}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid var(--color-tb-border)" }}>
          <p className="text-sm" style={{ color: "var(--color-tb-faint)" }}>
            © {new Date().getFullYear()} TrustBill. All rights reserved.
          </p>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: "var(--color-tb-card)",
              border: "1px solid var(--color-tb-border)",
              color: "var(--color-tb-muted)",
            }}
          >
            <span>⛓️</span>
            <span>Built on Stacks. Secured by Bitcoin.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Menu, X, ChevronDown, LogOut, Copy } from "lucide-react";
import { useWalletStore } from "@/store/walletStore";
import { truncateAddress, formatSTX } from "@/lib/utils";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pay Bills", href: "/pay" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "History", href: "/history" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const { connected, address, balance, connecting, connect, disconnect } =
    useWalletStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success("Wallet connected successfully!");
    } catch {
      toast.error("Failed to connect wallet.");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setWalletMenuOpen(false);
    toast.success("Wallet disconnected.");
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(8, 12, 20, 0.95)"
            : "rgba(8, 12, 20, 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid var(--color-tb-border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="relative w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ background: "linear-gradient(135deg, #00D4AA, #7C3AED)" }}
              >
                <Shield className="w-4 h-4 text-white absolute" />
                <Zap
                  className="w-3 h-3 text-white absolute"
                  style={{ marginTop: "1px" }}
                />
              </div>
              <span
                className="text-xl font-bold gradient-text"
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

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href.split("#")[0]) &&
                      link.href.split("#")[0] !== "/";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive
                        ? "var(--color-tb-teal)"
                        : "var(--color-tb-muted)",
                      background: isActive
                        ? "var(--color-tb-teal-glow)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--color-tb-text)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--color-tb-muted)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Wallet Button */}
            <div className="hidden lg:flex items-center gap-3">
              {connected && address ? (
                <div className="relative">
                  <button
                    onClick={() => setWalletMenuOpen((p) => !p)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "var(--color-tb-surface)",
                      border: "1px solid var(--color-tb-border-light)",
                      color: "var(--color-tb-text)",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, #00D4AA, #7C3AED)",
                        color: "#000",
                      }}
                    >
                      {address.slice(2, 4).toUpperCase()}
                    </div>
                    <span>{truncateAddress(address)}</span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(0, 212, 170, 0.1)",
                        color: "var(--color-tb-teal)",
                        border: "1px solid rgba(0, 212, 170, 0.2)",
                      }}
                    >
                      {formatSTX(balance)}
                    </span>
                    <ChevronDown className="w-4 h-4" style={{ color: "var(--color-tb-muted)" }} />
                  </button>

                  <AnimatePresence>
                    {walletMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl"
                        style={{
                          background: "var(--color-tb-card)",
                          border: "1px solid var(--color-tb-border)",
                        }}
                      >
                        <div
                          className="p-3 border-b"
                          style={{ borderColor: "var(--color-tb-border)" }}
                        >
                          <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                            Connected Wallet
                          </p>
                          <p className="text-sm font-mono font-medium mt-0.5">
                            {truncateAddress(address, 8)}
                          </p>
                        </div>
                        <div className="p-1">
                          <button
                            onClick={handleCopyAddress}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors"
                            style={{ color: "var(--color-tb-muted)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.05)";
                              e.currentTarget.style.color =
                                "var(--color-tb-text)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color =
                                "var(--color-tb-muted)";
                            }}
                          >
                            <Copy className="w-4 h-4" />
                            Copy Address
                          </button>
                          <button
                            onClick={handleDisconnect}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors"
                            style={{ color: "var(--color-tb-error)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(239,68,68,0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all btn-teal disabled:opacity-60"
                >
                  {connecting ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"
                      />
                      Connecting...
                    </span>
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "var(--color-tb-muted)" }}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 lg:hidden flex flex-col"
              style={{
                background: "var(--color-tb-card)",
                borderLeft: "1px solid var(--color-tb-border)",
              }}
            >
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: "var(--color-tb-border)" }}
              >
                <span className="font-bold gradient-text" style={{
                  background: "linear-gradient(135deg, #00D4AA, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  TrustBill
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "var(--color-tb-muted)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col p-4 gap-1 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: "var(--color-tb-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "var(--color-tb-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--color-tb-muted)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div
                className="p-4 border-t"
                style={{ borderColor: "var(--color-tb-border)" }}
              >
                {connected ? (
                  <div className="space-y-2">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: "var(--color-tb-surface)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--color-tb-muted)" }}>
                        Connected
                      </p>
                      <p className="text-sm font-mono font-medium">
                        {truncateAddress(address ?? "")}
                      </p>
                      <p
                        className="text-sm font-medium mt-1"
                        style={{ color: "var(--color-tb-teal)" }}
                      >
                        {formatSTX(balance)}
                      </p>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full py-2.5 rounded-xl text-sm font-medium"
                      style={{
                        color: "var(--color-tb-error)",
                        border: "1px solid rgba(239,68,68,0.3)",
                      }}
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="w-full py-3 rounded-xl font-semibold btn-teal disabled:opacity-60"
                  >
                    {connecting ? "Connecting..." : "Connect Wallet"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";

interface STXPrice {
  usd: number;
  change24h: number;
  loading: boolean;
  error: boolean;
}

export function useSTXPrice(): STXPrice {
  const [price, setPrice] = useState<Omit<STXPrice, "loading" | "error">>({
    usd: 0.62,
    change24h: 2.4,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd&include_24hr_change=true",
          { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        const stx = data?.blockstack;
        if (stx) {
          setPrice({
            usd: stx.usd ?? 0.62,
            change24h: stx.usd_24h_change ?? 0,
          });
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { ...price, loading, error };
}

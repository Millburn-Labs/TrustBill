import { create } from "zustand";

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  address: null,
  balance: 0,
  connecting: false,

  connect: async () => {
    set({ connecting: true });
    // Simulate wallet connection (real implementation uses @stacks/connect)
    await new Promise((r) => setTimeout(r, 1200));
    set({
      connected: true,
      connecting: false,
      address: "SP2X0TZ59D5SZ8ACQ6YMCHHNR2ZN51Z32E2CJ173",
      balance: 1842.5,
    });
  },

  disconnect: () => {
    set({ connected: false, address: null, balance: 0 });
  },
}));

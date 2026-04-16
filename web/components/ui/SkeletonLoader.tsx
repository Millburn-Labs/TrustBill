"use client";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-lg ${className}`}
      style={{
        background: "var(--color-tb-border)",
        ...style,
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: "var(--color-tb-card)",
        border: "1px solid var(--color-tb-border)",
      }}
    >
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div
      className="flex items-center gap-4 p-4 border-b"
      style={{ borderColor: "var(--color-tb-border)" }}
    >
      <Skeleton className="h-8 w-8 rounded-full" style={{ borderRadius: "50%" }} />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

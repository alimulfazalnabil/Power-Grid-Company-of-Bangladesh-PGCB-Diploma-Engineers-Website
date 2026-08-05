import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "destructive";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-700 text-slate-100",
  secondary: "bg-slate-800 text-slate-100",
  destructive: "bg-red-600 text-white",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
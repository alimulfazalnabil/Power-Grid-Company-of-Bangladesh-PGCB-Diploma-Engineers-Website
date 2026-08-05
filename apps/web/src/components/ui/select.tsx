import type { HTMLAttributes, ReactNode } from "react";

export function Select({
  children,
  value,
  onValueChange,
}: {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return <div className="inline-flex flex-col gap-1" data-value={value} onClickCapture={(event) => {
    const target = event.target as HTMLElement;
    const option = target.closest("button[data-value]") as HTMLButtonElement | null;

    if (option && onValueChange) {
      onValueChange(option.dataset.value ?? "");
    }
  }}>{children}</div>;
}

export function SelectTrigger({ className = "", ...props }: HTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={`inline-flex h-10 items-center justify-between rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm ${className}`} {...props} />;
}

export function SelectValue({ children, placeholder }: { children?: ReactNode; placeholder?: string }) {
  return <span>{children ?? placeholder ?? ""}</span>;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <div className="mt-1 rounded-md border border-slate-800 bg-slate-950 p-1">{children}</div>;
}

export function SelectItem({ children, value }: { children: ReactNode; value: string }) {
  return (
    <button type="button" data-value={value} className="block w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-slate-800">
      {children}
    </button>
  );
}
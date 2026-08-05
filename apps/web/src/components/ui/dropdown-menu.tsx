import type { HTMLAttributes, ReactElement, ReactNode } from "react";

function renderAsChild(children: ReactNode, fallback: ReactNode) {
  if (children && typeof children === "object" && "props" in children) {
    return children as ReactElement;
  }

  return fallback;
}

export function DropdownMenu({ children }: { children: ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: {
  children: ReactNode;
  asChild?: boolean;
}) {
  return renderAsChild(children, <button type="button">{children}</button>);
}

export function DropdownMenuContent({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end" }) {
  return (
    <div className={`mt-2 rounded-md border border-slate-800 bg-slate-950 p-2 shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  asChild = false,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  const fallback = (
    <div className={`flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-800 ${className}`} {...props}>
      {children}
    </div>
  );

  return renderAsChild(children, fallback);
}
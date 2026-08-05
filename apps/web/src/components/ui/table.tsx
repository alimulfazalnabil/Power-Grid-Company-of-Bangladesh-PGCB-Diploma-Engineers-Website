import type { HTMLAttributes, TableHTMLAttributes } from "react";

export function Table({ className = "", ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full caption-bottom text-sm ${className}`} {...props} />;
}

export function TableHeader({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`border-b border-slate-800 ${className}`} {...props} />;
}

export function TableBody({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className = "", ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`border-b border-slate-800 ${className}`} {...props} />;
}

export function TableHead({ className = "", ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-slate-300 ${className}`} {...props} />;
}

export function TableCell({ className = "", ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={`p-4 align-middle ${className}`} {...props} />;
}
"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function MediaToolbar() {
  return (
    <div className="rounded-xl border p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media..." className="pl-10" />
        </div>

        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="all">All folders</option>
        </select>

        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
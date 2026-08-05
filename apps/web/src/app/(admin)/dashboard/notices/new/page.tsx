import Link from "next/link";
import type { Route } from "next";

import { Button } from "@/components/ui/button";

export default function NewNoticePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Dashboard / Notices / New</p>
        <h1 className="mt-2 text-3xl font-bold">Create Notice</h1>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <p className="text-sm text-slate-300">
          The notice editor route is available again, so the dashboard navigation and
          typed routes can build cleanly.
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href={"/dashboard/notices" as Route}>Back to notices</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
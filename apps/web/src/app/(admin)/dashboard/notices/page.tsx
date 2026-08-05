import Link from "next/link";
import type { Route } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NoticeTable } from "@/components/admin/notices/NoticeTable";

export default function NoticeAdminPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Notice Management
          </h1>

          <p className="text-muted-foreground mt-2">
            Create, edit, publish and manage notices.
          </p>

        </div>

        <Button asChild>

          <Link href={"/dashboard/notices/new" as Route}>

            <Plus className="mr-2 h-4 w-4"/>

            New Notice

          </Link>

        </Button>

      </div>

      <NoticeTable />

    </div>
  );
}

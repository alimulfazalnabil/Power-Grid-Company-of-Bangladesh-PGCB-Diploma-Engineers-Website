"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  Eye,
  Pencil,
  Trash2,
  Copy,
  Upload,
  Archive,
  MoreHorizontal,
} from "lucide-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useNotices } from "@/hooks/useNotices";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { NoticeListResponse, NoticeSummary } from "@/services/notice.service";

const columns: ColumnDef<NoticeSummary>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.title}
        </div>

        <div className="text-xs text-muted-foreground">
          /{row.original.slug}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
  },

  {
    accessorKey: "view_count",
    header: "Views",
  },

  {
    accessorKey: "published_at",
    header: "Published",
    cell: ({ row }) =>
      row.original.published_at
        ? new Date(
            row.original.published_at
          ).toLocaleDateString()
        : "-",
  },

  {
    id: "actions",

    cell: ({ row }) => (

      <DropdownMenu>

        <DropdownMenuTrigger asChild>

          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4"/>
          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem asChild>

            <Link
              href={`/notices/${row.original.slug}` as Route}
            >
              <Eye className="mr-2 h-4 w-4"/>
              View
            </Link>

          </DropdownMenuItem>

          <DropdownMenuItem asChild>

            <Link
              href={`/dashboard/notices/${row.original.id}` as Route}
            >
              <Pencil className="mr-2 h-4 w-4"/>
              Edit
            </Link>

          </DropdownMenuItem>

          <DropdownMenuItem>

            <Upload className="mr-2 h-4 w-4"/>

            Publish

          </DropdownMenuItem>

          <DropdownMenuItem>

            <Archive className="mr-2 h-4 w-4"/>

            Archive

          </DropdownMenuItem>

          <DropdownMenuItem>

            <Copy className="mr-2 h-4 w-4"/>

            Duplicate

          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">

            <Trash2 className="mr-2 h-4 w-4"/>

            Delete

          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

    ),
  },
];

export function NoticeTable() {

  const {
    data,
    isLoading,
  } = useNotices({
    page: 1,
    page_size: 20,
  }) as {
    data?: NoticeListResponse;
    isLoading: boolean;
  };

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="rounded-xl border">

      <Table>

        <TableHeader>

          {table
            .getHeaderGroups()
            .map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead key={header.id}>

                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                  </TableHead>

                ))}

              </TableRow>

          ))}

        </TableHeader>

        <TableBody>

          {table
            .getRowModel()
            .rows
            .map((row) => (

            <TableRow key={row.id}>

              {row
                .getVisibleCells()
                .map((cell) => (

                <TableCell key={cell.id}>

                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}

                </TableCell>

              ))}

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  );

}

function StatusBadge({
  status,
}: {
  status: string;
}) {

  switch (status) {

    case "PUBLISHED":
      return (
        <Badge className="bg-green-600">
          Published
        </Badge>
      );

    case "DRAFT":
      return (
        <Badge variant="secondary">
          Draft
        </Badge>
      );

    case "REVIEW":
      return (
        <Badge className="bg-yellow-500">
          Review
        </Badge>
      );

    case "ARCHIVED":
      return (
        <Badge variant="destructive">
          Archived
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;

  }

}

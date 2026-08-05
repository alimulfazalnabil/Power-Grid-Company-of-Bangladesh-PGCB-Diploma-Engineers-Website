"use client";

import Image from "next/image";
import { File } from "lucide-react";

import type { MediaFile } from "@/services/media.service";

interface MediaCardProps {
  file: MediaFile;
}

export function MediaCard({ file }: MediaCardProps) {
  const isImage = file.mime_type.startsWith("image/");

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="relative aspect-square bg-muted">
        {isImage ? (
          <Image
            src={file.thumbnail_url ?? file.url}
            alt={file.original_name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <File className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <p className="truncate text-sm font-medium">{file.original_name}</p>
        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
      </div>
    </div>
  );
}
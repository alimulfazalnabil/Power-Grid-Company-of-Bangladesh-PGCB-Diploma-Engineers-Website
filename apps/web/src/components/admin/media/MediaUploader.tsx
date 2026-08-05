"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUploadMedia } from "@/hooks/useMedia";

export function MediaUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync, isPending } = useUploadMedia();

  return (
    <div className="rounded-xl border border-dashed p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag and drop files here, or choose from disk.</p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) {
              return;
            }

            await mutateAsync(file);
            event.target.value = "";
          }}
        />

        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
        >
          {isPending ? "Uploading..." : "Upload File"}
        </Button>
      </div>
    </div>
  );
}
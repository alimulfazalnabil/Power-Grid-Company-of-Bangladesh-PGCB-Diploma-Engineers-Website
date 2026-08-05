"use client";

import {
  Search,
  X,
  Loader2,
} from "lucide-react";

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NoticeSearchProps {
  placeholder?: string;
  debounce?: number;
  loading?: boolean;
}

export function NoticeSearch({
  placeholder = "Search notices...",
  debounce = 400,
  loading = false,
}: NoticeSearchProps) {

  const router = useRouter();

  const searchParams = useSearchParams();

  const initialValue =
    searchParams.get("search") ?? "";

  const [value, setValue] =
    useState(initialValue);

  const updateURL = useCallback(
    (keyword: string) => {

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (keyword.trim()) {
        params.set("search", keyword);
        params.set("page", "1");
      } else {
        params.delete("search");
        params.delete("page");
      }

      router.replace(
        `?${params.toString()}`
      );

    },
    [router, searchParams]
  );

  useEffect(() => {

    const timer = setTimeout(() => {
      updateURL(value);
    }, debounce);

    return () => clearTimeout(timer);

  }, [value, debounce, updateURL]);

  useEffect(() => {

    const handler = (
      event: KeyboardEvent
    ) => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        document
          .getElementById(
            "notice-search"
          )
          ?.focus();

      }

    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );

  }, []);

  return (

    <div className="relative w-full">

      <Search
        className="
          absolute
          left-3
          top-3
          h-4
          w-4
          text-muted-foreground
        "
      />

      <Input
        id="notice-search"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          setValue(e.target.value)
        }
        className="pl-10 pr-20"
      />

      <div
        className="
          absolute
          right-2
          top-1.5
          flex
          items-center
          gap-1
        "
      >

        {loading && (
          <Loader2
            className="
              h-4
              w-4
              animate-spin
            "
          />
        )}

        {value && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              setValue("")
            }
          >
            <X className="h-4 w-4" />
          </Button>
        )}

      </div>

    </div>

  );
}
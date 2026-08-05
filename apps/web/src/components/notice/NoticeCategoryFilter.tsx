"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categoryService } from "@/services/category.service";

interface Category {
  id: string;
  name: string;
}

export function NoticeCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);

  const selectedCategory =
    searchParams.get("category") ?? "all";

  useEffect(() => {
    async function loadCategories() {
      const data =
        await categoryService.getNoticeCategories();

      setCategories(data);
    }

    loadCategories();
  }, []);

  function onCategoryChange(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    params.set("page", "1");

    router.replace(
      `?${params.toString()}`
    );
  }

  return (
    <Select
      value={selectedCategory}
      onValueChange={onCategoryChange}
    >
      <SelectTrigger className="w-full md:w-72">
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent>

        <SelectItem value="all">
          All Categories
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))}

      </SelectContent>

    </Select>
  );
}
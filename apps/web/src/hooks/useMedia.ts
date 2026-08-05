"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { MediaQuery, mediaService } from "@/services/media.service";

export const mediaKeys = {
  all: ["media"] as const,
  list: (params: MediaQuery) => [...mediaKeys.all, "list", params] as const,
  detail: (id: string) => [...mediaKeys.all, "detail", id] as const,
};

export function useMedia(params: MediaQuery = {}) {
  return useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: () => mediaService.list(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useMediaFile(id: string) {
  return useQuery({
    queryKey: mediaKeys.detail(id),
    queryFn: () => mediaService.getById(id),
    enabled: !!id,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => mediaService.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all });
    },
  });
}
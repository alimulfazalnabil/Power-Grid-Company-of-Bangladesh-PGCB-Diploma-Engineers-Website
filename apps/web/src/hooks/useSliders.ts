'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  CreateSliderRequest,
  UpdateSliderRequest,
  sliderService,
} from '@/services/slider.service';

export const sliderKeys = {
  all: ['sliders'] as const,

  homepage: () => [...sliderKeys.all, 'homepage'] as const,

  list: (page: number, pageSize: number) =>
    [...sliderKeys.all, 'list', page, pageSize] as const,

  detail: (id: string) =>
    [...sliderKeys.all, 'detail', id] as const,
};

export function useHomepageSliders() {
  return useQuery({
    queryKey: sliderKeys.homepage(),
    queryFn: () => sliderService.getHomepageSliders(),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}

export function useSliders() {
  return useHomepageSliders();
}

export function useSlider(id: string) {
  return useQuery({
    queryKey: sliderKeys.detail(id),

    queryFn: () => sliderService.getById(id),

    enabled: !!id,
  });
}

export function useSliderList(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: sliderKeys.list(page, pageSize),

    queryFn: () => sliderService.getAll(page, pageSize),
  });
}

export function useCreateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSliderRequest) => sliderService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.all });
    },
  });
}

export function useUpdateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSliderRequest;
    }) => sliderService.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.all });
    },
  });
}

export function useDeleteSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sliderService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.all });
    },
  });
}

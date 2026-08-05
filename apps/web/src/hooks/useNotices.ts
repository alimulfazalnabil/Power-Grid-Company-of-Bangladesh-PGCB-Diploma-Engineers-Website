'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  noticeService,
  NoticeSearchParams,
  NoticeDetail,
  NoticeListResponse,
  NoticeSummary,
} from '@/services/notice.service';

export const noticeKeys = {
  all: ['notices'] as const,

  lists: () => [...noticeKeys.all, 'list'] as const,

  list: (params: NoticeSearchParams) =>
    [...noticeKeys.lists(), params] as const,

  latest: () =>
    [...noticeKeys.all, 'latest'] as const,

  featured: () =>
    [...noticeKeys.all, 'featured'] as const,

  detail: (slug: string) =>
    [...noticeKeys.all, slug] as const,
};

export function useNotices(
  params: NoticeSearchParams = {}
 ) {
  return useQuery<NoticeListResponse, Error>({
    queryKey: noticeKeys.list(params),

    queryFn: () =>
      noticeService.getNotices(params),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,
  });
}

export function useLatestNotices(
  limit = 5
 ) {
  return useQuery<NoticeSummary[], Error>({
    queryKey: [
      ...noticeKeys.latest(),
      limit,
    ],

    queryFn: () =>
      noticeService.getLatest(limit),

    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedNotices(
  limit = 5
 ) {
  return useQuery<NoticeSummary[], Error>({
    queryKey: [
      ...noticeKeys.featured(),
      limit,
    ],

    queryFn: () =>
      noticeService.getFeatured(limit),

    staleTime: 1000 * 60 * 10,
  });
}

export function useNotice(
  slug: string
 ) {
  return useQuery<NoticeDetail, Error>({
    queryKey: noticeKeys.detail(slug),

    queryFn: () =>
      noticeService.getBySlug(slug),

    enabled: !!slug,

    staleTime: 1000 * 60 * 10,
  });
}

export function useInvalidateNotices() {

  const queryClient =
    useQueryClient();

  return () => {

    queryClient.invalidateQueries({
      queryKey: noticeKeys.all,
    });

  };

}
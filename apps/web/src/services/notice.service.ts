import { api } from './api';

export interface NoticeSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail?: string | null;
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  is_featured: boolean;
  view_count: number;
  published_at?: string | null;
}

export interface NoticeDetail extends NoticeSummary {
  content: string;
  category_id: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface NoticeListResponse {
  items: NoticeSummary[];
  total: number;
  page: number;
  page_size: number;
}

export interface NoticeSearchParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  status?: string;
}

class NoticeService {
  async getNotices(params: NoticeSearchParams = {}): Promise<NoticeListResponse> {
    const { data } = await api.get<NoticeListResponse>('/api/v1/notices', {
      params,
    });

    return data;
  }

  async getLatest(limit = 5): Promise<NoticeSummary[]> {
    const { data } = await api.get<NoticeSummary[]>('/api/v1/notices/latest', {
      params: {
        limit,
      },
    });

    return data;
  }

  async getBySlug(slug: string): Promise<NoticeDetail> {
    const { data } = await api.get<NoticeDetail>(`/api/v1/notices/${slug}`);

    return data;
  }

  async getFeatured(limit = 5): Promise<NoticeSummary[]> {
    const { data } = await api.get<NoticeListResponse>('/api/v1/notices', {
      params: {
        featured: true,
        page: 1,
        page_size: limit,
      },
    });

    return data.items;
  }

  async search(keyword: string): Promise<NoticeListResponse> {
    return this.getNotices({
      search: keyword,
    });
  }

  async byCategory(category: string): Promise<NoticeListResponse> {
    return this.getNotices({
      category,
    });
  }
}

export const noticeService = new NoticeService();
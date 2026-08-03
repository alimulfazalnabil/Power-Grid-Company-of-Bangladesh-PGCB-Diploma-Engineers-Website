import { api } from './api';

export interface Slider {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  button_text: string;
  button_url: string;
  sort_order: number;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SliderListResponse {
  items: Slider[];
  total: number;
  page: number;
  page_size: number;
}

export interface CreateSliderRequest {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  button_text: string;
  button_url: string;
  sort_order: number;
  is_active: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
}

export type UpdateSliderRequest = Partial<CreateSliderRequest>;

class SliderService {
  /**
   * Public homepage sliders
   */
  async getHomepageSliders(): Promise<Slider[]> {
    const { data } = await api.get<Slider[]>('/api/v1/sliders');
    return data;
  }

  /**
   * CMS list
   */
  async getAll(page = 1, pageSize = 10): Promise<SliderListResponse> {
    const { data } = await api.get<SliderListResponse>('/api/v1/sliders/admin/list', {
      params: {
        page,
        page_size: pageSize,
      },
    });

    return data;
  }

  async getById(id: string): Promise<Slider> {
    const { data } = await api.get<Slider>(`/api/v1/sliders/${id}`);
    return data;
  }

  async create(payload: CreateSliderRequest): Promise<Slider> {
    const { data } = await api.post<Slider>('/api/v1/sliders', payload);
    return data;
  }

  async update(id: string, payload: UpdateSliderRequest): Promise<Slider> {
    const { data } = await api.put<Slider>(`/api/v1/sliders/${id}`, payload);
    return data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/api/v1/sliders/${id}`);
  }
}

export const sliderService = new SliderService();

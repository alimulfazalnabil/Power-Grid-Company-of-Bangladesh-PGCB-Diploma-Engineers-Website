import { api } from "./api";

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  width?: number;
  height?: number;
  url: string;
  thumbnail_url?: string;
  created_at: string;
}

export interface MediaQuery {
  page?: number;
  page_size?: number;
  search?: string;
  folder_id?: string;
  type?: string;
  sort?: "newest" | "oldest";
}

export interface MediaListResponse {
  items: MediaFile[];
  total: number;
  page: number;
  page_size: number;
}

class MediaService {
  async list(params: MediaQuery = {}): Promise<MediaListResponse> {
    const { data } = await api.get<MediaListResponse>("/admin/media", { params });
    return data;
  }

  async upload(file: File): Promise<MediaFile> {
    const form = new FormData();
    form.append("file", file);

    const { data } = await api.post<MediaFile>("/admin/media/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  }

  async getById(id: string): Promise<MediaFile> {
    const { data } = await api.get<MediaFile>(`/admin/media/${id}`);
    return data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/admin/media/${id}`);
  }
}

export const mediaService = new MediaService();
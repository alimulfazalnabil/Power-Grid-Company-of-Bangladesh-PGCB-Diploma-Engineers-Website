import { api } from "./api";

export interface NoticeCategory {
  id: string;
  name: string;
}

class CategoryService {
  async getNoticeCategories(): Promise<
    NoticeCategory[]
  > {
    const { data } =
      await api.get(
        "/api/v1/notice-categories"
      );

    return data;
  }
}

export const categoryService =
  new CategoryService();
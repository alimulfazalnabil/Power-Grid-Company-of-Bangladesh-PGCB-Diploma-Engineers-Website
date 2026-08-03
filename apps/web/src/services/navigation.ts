import { api } from './api';
import { NavigationItem } from '../types/navigation';

export async function getNavigation() {
  const { data } = await api.get<NavigationItem[]>('/navigation');
  return data;
}

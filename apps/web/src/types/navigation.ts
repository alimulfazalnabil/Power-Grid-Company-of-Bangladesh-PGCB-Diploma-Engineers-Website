export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  children?: NavigationItem[];
}

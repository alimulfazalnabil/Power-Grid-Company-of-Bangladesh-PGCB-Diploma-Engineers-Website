export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

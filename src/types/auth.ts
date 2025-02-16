export interface User {
  id: string;
  email: string;
  nickname?: string;
}

export interface ErrorMessages {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nickname?: string;
  general?: string;
}

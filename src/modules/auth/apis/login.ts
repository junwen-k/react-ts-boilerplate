import type { ApiResponse } from '@/apis';
import { client } from '@/lib/ky';

interface LoginInput {
  email: string;
  password: string;
}

export const login = (input: LoginInput) =>
  client
    .post<ApiResponse<{ accessToken: string; expiresIn: number }>>(
      'auth/login',
      {
        json: input,
      }
    )
    .json();

import type { ApiResponse } from '@/apis';
import { client } from '@/lib/ky';

export const getProfile = () =>
  client.get<ApiResponse<{ id: string }>>('auth/profile').json();

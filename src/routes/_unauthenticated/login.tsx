import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import { Login } from '@/modules/auth/pages/login';

const loginSearchSchema = z
  .object({
    redirect: fallback(z.string(), '').optional(),
  })
  .optional();

export const Route = createFileRoute('/_unauthenticated/login')({
  validateSearch: zodSearchValidator(loginSearchSchema),
  component: Login,
});

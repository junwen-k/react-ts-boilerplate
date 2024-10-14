import { createUseMutation } from '@/lib/react-query';
import { login } from '@/modules/auth/apis';

export const useLoginMutation = createUseMutation({
  mutationFn: login,
});

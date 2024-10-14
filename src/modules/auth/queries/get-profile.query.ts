import { queryOptions } from '@tanstack/react-query';

import { createUseInvalidateQueries, createUseQuery } from '@/lib/react-query';
import { getProfile } from '@/modules/auth/apis';

const getProfileQueryOptions = (...input: Parameters<typeof getProfile>) =>
  queryOptions({
    queryKey: ['auth/profile'],
    queryFn: () => getProfile(...input),
  });

export const useGetProfileQuery = createUseQuery(getProfileQueryOptions);

export const useInvalidateGetProfileQueries = createUseInvalidateQueries(
  getProfileQueryOptions
);

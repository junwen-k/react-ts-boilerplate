import {
  QueryClient,
  type QueryClientProviderProps,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

export const mutationCache = new MutationCache({
  onError: (err) => toast.error(err.message),
});

export const queryClient = new QueryClient({
  mutationCache,
});

export const QueryClientProvider = ({
  children,
  ...props
}: Omit<QueryClientProviderProps, 'client'>) => (
  <TanstackQueryClientProvider client={queryClient} {...props}>
    {children}
    <ReactQueryDevtools />
  </TanstackQueryClientProvider>
);

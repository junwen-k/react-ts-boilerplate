import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';

import {
  QueryClientProvider,
  queryClient,
} from '@/components/query-client-provider';
import {
  AuthProvider,
  useAuthContext,
} from '@/modules/auth/components/auth-provider';
import { routeTree } from '@/routeTree.gen';

import './index.css';

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const AuthRouterProvider = () => {
  const auth = useAuthContext();

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        auth,
      }}
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <CookiesProvider>
        <AuthProvider>
          <AuthRouterProvider />
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>
);

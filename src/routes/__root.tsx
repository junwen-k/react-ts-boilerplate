import '@fontsource-variable/inter';

import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import * as React from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Confirmer } from '@/components/ui/confirmer';
import { Toaster } from '@/components/ui/sonner';
import type { AuthContextProps } from '@/modules/auth/components/auth-provider';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((module) => ({
          default: module.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContextProps;
}>()({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
        <Confirmer />
        <Toaster />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context: { auth }, location }) => {
    if (!auth?.state?.id) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <div>
      Authenticated Layout:
      <Outlet />
    </div>
  ),
});

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: ({ context: { auth } }) => {
    if (auth?.state?.id) {
      throw redirect({ to: '/' });
    }
  },
  component: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-muted px-4 sm:px-8">
      <Outlet />
    </div>
  ),
});

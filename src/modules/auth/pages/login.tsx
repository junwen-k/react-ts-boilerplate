import { getRouteApi, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/modules/auth/components/auth-provider';
import {
  LoginForm,
  LoginFormEmailInput,
  LoginFormPasswordInput,
} from '@/modules/auth/components/login-form';

const route = getRouteApi('/_unauthenticated/login');

export const Login = () => {
  const search = route.useSearch();
  const router = useRouter();

  const { actions } = useAuthContext();

  const handleLogin: React.ComponentProps<typeof LoginForm>['onSubmit'] = (
    data
  ) => {
    actions.login(data, {
      onSuccess: () => {
        toast.success('Successfully logged in.');
        router.history.push(search?.redirect ?? '/');
      },
    });
  };

  return (
    <Card className="w-screen max-w-md">
      <LoginForm onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome to this example project.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginFormEmailInput />
          <LoginFormPasswordInput />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </LoginForm>
    </Card>
  );
};

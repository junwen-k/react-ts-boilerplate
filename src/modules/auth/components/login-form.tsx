import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  PasswordInput,
  PasswordInputAdornmentRevealToggle,
  PasswordInputControl,
  PasswordInputInput,
} from '@/components/ui/password-input';
import { createForm } from '@/lib/react-hook-form';

export const LoginFormSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

const LoginFormDefaultValues = {
  email: '',
  password: '',
} as const satisfies LoginFormValues;

export const [LoginForm, useLoginFormContext] = createForm(
  'LoginForm',
  LoginFormSchema,
  { defaultValues: LoginFormDefaultValues }
);

export const LoginFormEmailInput = () => {
  const form = useLoginFormContext();

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="example@email.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const LoginFormPasswordInput = () => {
  const form = useLoginFormContext();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <PasswordInput>
            <PasswordInputControl>
              <FormControl>
                <PasswordInputInput
                  autoComplete="current-password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
            </PasswordInputControl>
            <PasswordInputAdornmentRevealToggle />
          </PasswordInput>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

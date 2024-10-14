import { addSeconds } from 'date-fns';
import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { useCookies } from 'react-cookie';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/modules/auth/lib/auth-cookie';
import {
  useGetProfileQuery,
  useInvalidateGetProfileQueries,
  useLoginMutation,
} from '@/modules/auth/queries';

export interface AuthContextProps {
  actions: {
    login: (
      ...props: Parameters<ReturnType<typeof useLoginMutation>['mutate']>
    ) => void;
    logout: () => void;
  };
  // Replace with your authenticated profile. E.g, `import type { User } from '@/modules/user/entities';`
  state?: { id: string };
}

export const AuthContext = React.createContext<AuthContextProps>({
  actions: {
    login: async () => Promise.resolve(undefined),
    logout: async () => Promise.resolve(undefined),
  },
  state: undefined,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [, setCookie, removeCookie] = useCookies([
    ACCESS_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
  ]);

  const { data: profile } = useGetProfileQuery()();
  const invalidate = useInvalidateGetProfileQueries()();

  const { mutate: login } = useLoginMutation({
    onSuccess: ({ data }) => {
      const { accessToken, expiresIn } = data;
      setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        expires: addSeconds(new Date(), expiresIn),
        secure: true,
        sameSite: 'strict',
      });
      invalidate();
    },
  });

  return (
    <AuthContext.Provider
      value={{
        actions: {
          login: React.useCallback(login, [login]),
          logout: React.useCallback(() => {
            removeCookie(ACCESS_TOKEN_COOKIE_NAME, {
              secure: true,
              sameSite: 'strict',
            });
            invalidate();
          }, [invalidate, removeCookie]),
        },
        state: profile?.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

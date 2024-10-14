import type {
  DefaultError,
  FetchQueryOptions,
  InfiniteData,
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

/**
 * ```ts
 * const useMyMutation = createUseMutation({
 *  mutationFn: (arg1: number) => myApi(arg1),
 * })
 *
 * // Types will be inferred automatically:
 *
 * const { mutate } = useMyMutation({
 *  // ...options
 * })
 *
 * mutate(10)
 * ```
 */
export const createUseMutation =
  <
    TData = unknown,
    TError = DefaultError,
    TVariables = void,
    TContext = unknown,
  >(
    mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>
  ) =>
  (
    options?: Omit<
      UseMutationOptions<TData, TError, TVariables, TContext>,
      'mutationFn'
    >
  ) =>
    useMutation({
      ...mutationOptions,
      ...options,
    });

/**
 * ```ts
 * const useMyQuery = createUseQuery((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const { data } = useMyQuery(10, 'myArgs')({
 *  // ...options
 * })
 * ```
 */
export const createUseQuery =
  <
    TVariables extends Array<unknown> = [],
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryOptions: (
      ...variables: TVariables
    ) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ) =>
  (...variables: TVariables) =>
  (
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) =>
    useQuery({
      ...queryOptions(...variables),
      ...options,
    });

/**
 * ```ts
 * const useMyInfiniteQuery = createUseInfiniteQuery((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const { data } = useMyInfiniteQuery(10, 'myArgs')({
 *  // ...options
 * })
 * ```
 */
export const createUseInfiniteQuery =
  <
    TVariables extends Array<unknown> = [],
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    infiniteQueryOptions: (
      ...variables: TVariables
    ) => UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey,
      TPageParam
    >
  ) =>
  (...variables: TVariables) =>
  (
    options?: Omit<
      UseInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryFnData,
        TQueryKey,
        TPageParam
      >,
      'queryKey' | 'queryFn'
    >
  ) =>
    useInfiniteQuery({
      ...infiniteQueryOptions(...variables),
      ...options,
    });

/**
 * ```ts
 * const useMySuspenseQuery = createUseSuspenseQuery((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const { data } = useMySuspenseQuery(10, 'myArgs')({
 *  // ...options
 * })
 * ```
 */
export const createUseSuspenseQuery =
  <
    TVariables extends Array<unknown> = [],
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryOptions: (
      ...variables: TVariables
    ) => UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ) =>
  (...variables: TVariables) =>
  (
    options?: Omit<
      UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) =>
    useSuspenseQuery({
      ...queryOptions(...variables),
      ...options,
    });

/**
 * ```ts
 * const useInvalidateMyQueries = createUseInvalidateQueries((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const invalidateQueries = useInvalidateMyQueries(10, 'myArgs')({
 *  // ...options
 * })
 * ```
 */
export const createUseInvalidateQueries =
  <TVariables extends Array<unknown> = []>(
    filters: (...variables: TVariables) => InvalidateQueryFilters
  ) =>
  (...variables: TVariables) =>
  (options?: InvalidateOptions) => {
    const queryClient = useQueryClient();

    return () => queryClient.invalidateQueries(filters(...variables), options);
  };

/**
 * ```ts
 * const prefetchMyQuery = createPrefetchQuery((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const { data } = await prefetchMyQuery(10, 'myArgs')(queryClient, {
 *  // ...options
 * })
 * ```
 */
export const createPrefetchQuery =
  <
    TVariables extends Array<unknown> = [],
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryOptions: (
      ...variables: TVariables
    ) => FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ) =>
  (...variables: TVariables) =>
  (
    queryClient: QueryClient,
    options?: Omit<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) =>
    queryClient.prefetchQuery({
      ...queryOptions(...variables),
      ...options,
    });

/**
 * ```ts
 * const fetchMyQuery = createFetchQuery((arg1: number, arg2: string) => ({
 *  queryKey: ['myQuery', { arg1, arg2 }],
 *  queryFn: () => myApi(arg1, arg2),
 * }))
 *
 * // Types will be inferred automatically:
 *
 * const result = await fetchMyQuery(10, 'myArgs')
 * ```
 */
export const createUseFetchQuery =
  <
    TVariables extends Array<unknown> = [],
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryOptions: (
      ...variables: TVariables
    ) => FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ) =>
  (
    options?: Omit<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  ) => {
    const queryClient = useQueryClient();

    return (...variables: TVariables) =>
      queryClient.fetchQuery({
        ...queryOptions(...variables),
        ...options,
      });
  };

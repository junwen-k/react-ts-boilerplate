import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type {
  PaginationOptions,
  PaginationState,
  RowData,
  SortingOptions,
  SortingState,
} from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import type { Sort } from '@/lib/react-table';

export const useSearchParamsDataTablePagination = () => {
  const navigate = useNavigate({ from: '/' });
  const search = useSearch({ strict: false }) as {
    page: number;
    perPage: number;
  };

  const pagination = useMemo(
    () => ({
      pageIndex: (search?.page ?? 1) - 1,
      pageSize: search?.perPage,
    }),
    [search?.page, search?.perPage]
  ) as PaginationState;

  const onPaginationChange = useCallback<
    NonNullable<PaginationOptions['onPaginationChange']>
  >(
    (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater;

      navigate({
        search: (prev) => ({
          ...prev,
          page: newPagination.pageIndex + 1,
          perPage: newPagination.pageSize,
        }),
      });
    },
    [pagination, navigate]
  );

  return [pagination, onPaginationChange] as const;
};

// Sorting query respsects the following format `${column:asc|desc}`.
export const useSearchParamsDataTableSorting = <TData extends RowData>() => {
  const navigate = useNavigate({ from: '/' });
  const search = useSearch({ strict: false }) as {
    sort: Sort[];
  };

  const sorting = useMemo(
    () =>
      search?.sort?.map((s) => {
        const [id, direction] = s.split(':');

        return {
          id,
          desc: direction === 'desc',
        };
      }),
    [search?.sort]
  ) as SortingState;

  const onSortingChange = useCallback<
    NonNullable<SortingOptions<TData>['onSortingChange']>
  >(
    (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;

      navigate({
        search: (prev) => ({
          ...prev,
          sort: newSorting.length
            ? newSorting.map(
                (s) =>
                  `${s.id}:${s.desc ? 'desc' : 'asc'}` as `${string}:${'asc' | 'desc'}`
              )
            : undefined,
        }),
      });
    },
    [sorting, navigate]
  );

  return [sorting, onSortingChange] as const;
};

export const useSearchParamsForm = <
  T extends z.Schema,
  TFieldValues extends FieldValues = z.infer<T>,
>(
  schema: T
) => {
  const search = useSearch({ strict: false });

  return useForm<TFieldValues>({
    resolver: zodResolver(schema),
    values: schema.parse(search),
  });
};

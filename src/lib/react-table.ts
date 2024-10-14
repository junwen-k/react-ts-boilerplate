import type {
  RowData,
  RowSelectionState,
  TableOptions,
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { fallback } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import {
  useSearchParamsDataTablePagination,
  useSearchParamsDataTableSorting,
} from '@/hooks/use-search-params';

export type Sort = `${string}:${'asc' | 'desc'}`;

/**
 * ```ts
 * const useMyTable = createUseReactTable({
 *  columns,
 * })
 *
 * // Types will be inferred automatically:
 *
 * const table = useMyTable({
 *  // ...options
 * })
 * ```
 */
export const createUseReactTable =
  <TData extends RowData>(
    tableOptions: Omit<TableOptions<TData>, 'getCoreRowModel' | 'data'>
  ) =>
  (options: Omit<TableOptions<TData>, 'getCoreRowModel' | 'columns'>) =>
    useReactTable<TData>({
      getCoreRowModel: getCoreRowModel(),
      ...tableOptions,
      ...options,
    });

/**
 * Table pagination and sorting state are automatically synced to URL search params.
 *
 * ```ts
 * const useMyTable = createUseReactDataTable({
 *  columns,
 * })
 *
 * // Types will be inferred automatically:
 *
 * const table = useMyTable({
 *  // ...options
 * })
 * ```
 */
export const createUseReactDataTable =
  <TData extends RowData>(
    tableOptions: Omit<
      TableOptions<TData>,
      | 'getCoreRowModel'
      | 'data'
      | 'pagination'
      | 'onPaginationChange'
      | 'sorting'
      | 'onSortingChange'
    >
  ) =>
  (
    options: Omit<
      TableOptions<TData>,
      | 'getCoreRowModel'
      | 'columns'
      | 'pagination'
      | 'onPaginationChange'
      | 'sorting'
      | 'onSortingChange'
    >
  ) => {
    const [pagination, onPaginationChange] =
      useSearchParamsDataTablePagination();
    const [sorting, onSortingChange] = useSearchParamsDataTableSorting();

    return useReactTable<TData>({
      manualPagination: true,
      manualSorting: true,
      getCoreRowModel: getCoreRowModel(),
      state: {
        pagination,
        sorting,
        ...tableOptions?.state,
      },
      onPaginationChange,
      onSortingChange,
      ...tableOptions,
      ...options,
    });
  };

export const getCheckedRowSelectionIds = (rowSelection: RowSelectionState) =>
  Object.entries(rowSelection).reduce<Array<string>>(
    (result, [id, checked]) => (checked ? [...result, id] : result),
    []
  );

export const zodPagination = (defaultPage = 1, defaultPerPage = 10) =>
  z.object({
    page: fallback(z.number(), defaultPage).default(defaultPage),
    perPage: fallback(z.number(), defaultPerPage).default(defaultPerPage),
  });

export const zodSort = (defaultSort: Sort[] = []) =>
  z.object({
    sort: fallback(
      z
        .string()
        .refine((v) => {
          const [column, direction] = v.split(':');

          return !!column && (direction === 'desc' || direction === 'asc');
        })
        .transform((v) => v as Sort)
        .array(),
      defaultSort
    ).default(defaultSort),
  });

export const zodSearchParams = ({
  defaultPage = 1,
  defaultPerPage = 10,
  defaultSort = [],
}: {
  defaultPage?: number;
  defaultPerPage?: number;
  defaultSort?: Sort[];
}) => zodPagination(defaultPage, defaultPerPage).merge(zodSort(defaultSort));

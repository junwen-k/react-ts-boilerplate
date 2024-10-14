import type { CxOptions } from 'class-variance-authority';
import { cx } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: CxOptions) => twMerge(cx(inputs));

export const getAcronym = (str: string) =>
  Array.from(str.trim().match(/\b(\w)/g) ?? [])
    .join('')
    .toUpperCase();

// Forwarding generic components with type inference.
// Based on https://www.totaltypescript.com/forwardref-with-generic-components.
export function fixedForwardRef<T, P = object>(
  render: (
    props: React.PropsWithoutRef<P>,
    ref: React.Ref<T>
  ) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.forwardRef(render) as any;
}

export type InferTuple<T extends ReadonlyArray<unknown>> = [...T];

export type InferEnum<
  T extends Readonly<Record<string, V>>,
  V = unknown,
> = T[keyof T];

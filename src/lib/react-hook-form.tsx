import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import type { UseFormProps } from 'react-hook-form';
import { useForm, useFormContext } from 'react-hook-form';
import type { z } from 'zod';

import { Form, FormForm } from '@/components/ui/form';

/**
 * ```tsx
 * const formSchema = z.object({
 *   value: z.string().min(1, { message: 'Value is required' }),
 * });
 *
 * // Types will be inferred automatically:
 *
 * export const [MyForm, useMyFormContext] = createForm(
 *   'MyForm',
 *   formSchema,
 *   {
 *     defaultValues: { value: '' },
 *   }
 * );
 * ```
 */
export const createForm = <S extends z.Schema>(
  componentName: string,
  schema: S,
  formProps?: Omit<UseFormProps<z.infer<S>>, 'resolver'>
) => {
  type FormFactoryValues = z.infer<typeof schema>;

  interface FormFactoryProps
    extends Omit<React.ComponentPropsWithoutRef<typeof FormForm>, 'onSubmit'>,
      Omit<UseFormProps<FormFactoryValues>, 'resolver'> {
    onSubmit: (data: FormFactoryValues) => void;
  }

  const FormFactory = React.forwardRef<
    React.ElementRef<typeof FormForm>,
    FormFactoryProps
  >(({ onSubmit, ...props }, ref) => {
    const form = useForm({
      resolver: zodResolver(schema),
      ...formProps,
      ...props,
    });

    return (
      <Form {...form}>
        <FormForm onSubmit={onSubmit} ref={ref} {...props} />
      </Form>
    );
  });
  FormFactory.displayName = componentName;

  const useFormFactoryContext = () => useFormContext<FormFactoryValues>();

  return [FormFactory, useFormFactoryContext] as const;
};

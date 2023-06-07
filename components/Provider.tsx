'use client';

import useAppForm from '@/lib/hooks/useAppForm';
import { SubmitHandler, FormProvider } from 'react-hook-form';
// Types
import { FormValues } from '@/types/form';
import { useRouter } from 'next/navigation';

export default function Provider({ children }: FormProviderProps) {
  const route = useRouter();

  const methods = useAppForm({
    name: 'test',
    email: 'test@test.test',
    phone: '7357',
    plan: 'arcade',
    billing: 'monthly',
    addons: {
      online: false,
      storage: false,
      profile: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    route.push('/thank-you');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full">
        {children}
      </form>
    </FormProvider>
  );
}

interface FormProviderProps {
  children: React.ReactNode;
}

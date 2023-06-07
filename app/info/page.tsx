'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import FormWrapper from '@/components/FormWrapper';
import FormActions from '@/components/FormActions';

export default function InfoPage() {
  const router = useRouter();
  const { register, trigger, formState } = useAppFormContext();

  const { isValid, errors } = formState;

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/plan');
    }
  };

  return (
    <FormWrapper
      heading="Personal info"
      description="Please provide your name, email address, and phone number."
    >
      <div className="flex flex-col mt-6">
        <label className="flex flex-col">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              name
            </span>
            {errors.name && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.name.message}
              </span>
            )}
          </div>
          <input
            placeholder="e.g. Stephen King"
            className={clsx(
              'border',
              errors.name
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('name', {
              required: 'This field is required',
              maxLength: {
                value: 20,
                message: 'Name must be less than 20 characters',
              },
            })}
            onBlur={() => trigger('name')}
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col mt-4">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              email address
            </span>
            {errors.email && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.email.message}
              </span>
            )}
          </div>
          <input
            placeholder="e.g. stephenking@lorem.com"
            className={clsx(
              'border',
              errors.email
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('email', {
              required: 'This field is required',
              maxLength: {
                value: 80,
                message: 'Email must be less than 80 characters',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            onBlur={() => trigger('email')}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col mt-4">
          <div className="flex justify-between">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              phone number
            </span>
            {errors.phone && (
              <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.phone.message}
              </span>
            )}
          </div>
          <input
            placeholder="e.g. +1 234 567 890"
            className={clsx(
              'border',
              errors.phone
                ? 'border-strawberry-red'
                : 'border-light-gray focus:border-purplish-blue',
              'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
              'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
              'focus:outline-none'
            )}
            {...register('phone', {
              required: 'This field is required',
              maxLength: {
                value: 20,
                message: 'Phone Number must be less than 20 characters',
              },
              pattern: {
                value: /^[+]?[0-9\s]+$/,
                message: 'Invalid phone number',
              },
            })}
            onBlur={() => trigger('phone')}
            autoComplete="tel"
          />
        </label>
      </div>
      <FormActions>
        <button
          type="button"
          className="bg-marine-blue hover:opacity-80 transition duration-300 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={validateStep}
        >
          Next Step
        </button>
      </FormActions>
    </FormWrapper>
  );
}

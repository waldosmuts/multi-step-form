'use client';

import clsx from 'clsx';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Icons
import checkmarkIcon from '@/images/icon-checkmark.svg';
import FormWrapper from '@/components/FormWrapper';
import FormActions from '@/components/FormActions';

export default function AddonsPage() {
  const router = useRouter();
  const { register, trigger, formState, watch } = useAppFormContext();
  const { isValid } = formState;

  const selectedBilling = watch('billing');
  const selectedAddons = watch('addons');

  const validateStep = async () => {
    await trigger();
    if (isValid) {
      router.push('/summary');
    }
  };

  const addons: {
    [key: string]: {
      id: 'online' | 'storage' | 'profile';
      title: string;
      description: string;
      pricePerMonth: number;
      pricePerYear: number;
    };
  } = {
    online: {
      id: 'online',
      title: 'Online service',
      description: 'Access to multiplayer games',
      pricePerMonth: 1,
      pricePerYear: 10,
    },
    storage: {
      id: 'storage',
      title: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      pricePerMonth: 2,
      pricePerYear: 20,
    },
    profile: {
      id: 'profile',
      title: 'Customizable profile',
      description: 'Custom theme on your profile',
      pricePerMonth: 2,
      pricePerYear: 20,
    },
  };

  const Addons = Object.values(addons).map((addon) => {
    const selected = selectedAddons[addon.id];

    return (
      <label
        key={addon.id}
        className={clsx(
          'flex items-center border justify-between w-full',
          'rounded-lg py-3 lg:py-4 px-4 lg:px-6',
          'transition duration-300',
          'cursor-pointer',
          selected
            ? 'border-purplish-blue bg-alabaster'
            : 'border-light-gray hover:border-purplish-blue bg-transparent'
        )}
      >
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <input
            {...register(`addons.${addon.id}`)}
            type="checkbox"
            className="hidden"
          />
          <div
            className={clsx(
              'w-5 h-5 rounded',
              'flex justify-center items-center',
              'border transition duration-150',
              selected
                ? 'bg-purplish-blue border-transparent'
                : 'bg-transparent border-light-gray'
            )}
          >
            <Image
              src={checkmarkIcon}
              alt="Checkmark Icon"
              className={clsx(
                'transition duration-300',
                selected ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden={!selected}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-marine-blue text-sm lg:text-base">
              {addon.title}
            </h3>
            <p className="text-cool-gray text-xs lg:text-sm font-medium">
              {addon.description}
            </p>
          </div>
        </div>
        <span className="text-purplish-blue text-xs lg:text-sm font-medium">
          {selectedBilling === 'monthly'
            ? `+$${addon.pricePerMonth}/mo`
            : `+$${addon.pricePerYear}/yr`}
        </span>
      </label>
    );
  });

  return (
    <FormWrapper
      heading="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
    >
      <div className="flex flex-col w-full gap-4 mt-6">{Addons}</div>
      <FormActions>
        <Link
          href="/plan"
          className="text-cool-gray transition duration-300 hover:text-marine-blue font-medium lg:font-bold text-sm lg:text-base"
        >
          Go Back
        </Link>
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

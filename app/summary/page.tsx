'use client';

import useAppFormContext from '@/lib/hooks/useAppFormContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormWrapper from '@/components/FormWrapper';
import FormActions from '@/components/FormActions';

export default function SummaryPage() {
  const router = useRouter();
  const { watch } = useAppFormContext();

  const {
    //  name, phone,
    plan,
    billing,
    addons,
  } = watch();

  // if (!(!!name && !!phone && !!plan)) {
  //   router.replace('/info');
  // }

  const prices = {
    plans: {
      arcade: {
        monthly: 9,
        yearly: 90,
      },
      advanced: {
        monthly: 12,
        yearly: 120,
      },
      pro: {
        monthly: 15,
        yearly: 150,
      },
    },
    addons: {
      online: {
        monthly: 1,
        yearly: 10,
      },
      storage: {
        monthly: 2,
        yearly: 20,
      },
      profile: {
        monthly: 2,
        yearly: 20,
      },
    },
  };

  const displayPrice = (value: number) => {
    return `$${value}/${billing === 'monthly' ? 'mo' : 'yr'}`;
  };

  const total =
    prices.plans[plan][billing] +
    Object.entries(addons)
      .filter(([addon, selected]) => selected)
      .map(
        ([addon]) =>
          prices.addons[addon as 'online' | 'storage' | 'profile'][billing]
      )
      .reduce((total, price) => total + price, 0);

  const display = {
    plan: displayPrice(prices.plans[plan][billing]),
    addons: [
      {
        id: 'online',
        title: 'Online service',
        price: displayPrice(prices.addons.online[billing]),
      },
      {
        id: 'storage',
        title: 'Larger storage',
        price: displayPrice(prices.addons.storage[billing]),
      },
      {
        id: 'profile',
        title: 'Customizable profile',
        price: displayPrice(prices.addons.profile[billing]),
      },
    ],
    total: displayPrice(total),
  };

  const Addons = display.addons
    .filter((addon) => addons[addon.id as 'online' | 'storage' | 'profile'])
    .map((addon) => (
      <div key={addon.id} className="flex justify-between items-center">
        <span className="text-cool-gray text-sm">{addon.title}</span>
        <span className="text-marine-blue font-medium text-sm">
          +{addon.price}
        </span>
      </div>
    ));

  const hasAddons = Object.values(addons).some((addon) => addon === true);

  return (
    <FormWrapper
      heading="Finishing up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="flex flex-col bg-alabaster rounded-lg px-4 lg:px-6 mt-6 w-full shrink-0">
        <div className="flex items-center justify-between pt-4 pb-3 lg:pb-5">
          <div className="flex flex-col">
            <span className="capitalize text-marine-blue font-bold text-sm lg:text-base">
              {plan} ({billing})
            </span>
            <Link
              href="/plan"
              className="text-cool-gray hover:text-purplish-blue transition duration-300 underline text-sm font-medium decoration-2"
            >
              Change
            </Link>
          </div>
          <span className="text-marine-blue font-bold text-sm lg:text-[16px]">
            {display.plan}
          </span>
        </div>
        {hasAddons && (
          <div className="flex flex-col pt-3 lg:pt-4 pb-4 lg:pb-6 gap-3 border-t border-light-gray">
            {Addons}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center px-6 mt-6">
        <span className="text-cool-gray text-sm">
          Total (per {billing === 'monthly' ? 'month' : 'year'})
        </span>
        <span className="text-purplish-blue text-lg lg:text-xl font-bold">
          +{display.total}
        </span>
      </div>
      <FormActions>
        <Link
          href="/addons"
          className="text-cool-gray font-medium lg:font-bold text-sm lg:text-base"
        >
          Go Back
        </Link>
        <button
          type="submit"
          // className="bg-purplish-blue text-magnolia font-medium ml-auto mt-auto px-8 py-3 rounded-lg"
          className="bg-purplish-blue transition duration-300 hover:opacity-70 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
        >
          Confirm
        </button>
      </FormActions>
    </FormWrapper>
  );
}

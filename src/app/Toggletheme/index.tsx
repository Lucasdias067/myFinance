'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

const ToggleTheme = () => {
  const documentClasses = document.documentElement.classList;

  useEffect(() => {
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    systemPreference && documentClasses.add('dark');
  }, [documentClasses]);

  const toggle = () => {
    documentClasses.toggle('dark');
  };

  return (
    <div className='absolute right-[7%] top-[20%] w-max rounded-lg border p-2 dark:border-gray-700 sm:block md:top-[17%]'>
      <MoonIcon
        onClick={toggle}
        className='h-8 cursor-pointer text-slate-700 dark:hidden'
      />
      <SunIcon
        onClick={toggle}
        className='hidden h-8 cursor-pointer text-white dark:block dark:text-orange-500'
      />
    </div>
  );
};

export default ToggleTheme;

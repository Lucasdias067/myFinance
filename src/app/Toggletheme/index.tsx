'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

const ToggleTheme = () => {
  useEffect(() => {
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;
    const pageClasses = document.documentElement.classList;

    systemPreference && pageClasses.add('dark');
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className='absolute right-[7%] top-[18%] w-max rounded-lg p-2 sm:block'>
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

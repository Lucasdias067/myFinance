import { formatCurrentMonth } from '@/helpers/dateFilter';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/solid';

type Props = { handleMonth: (signal: string) => void; currentMonth: string };

export default function DatePicker({ handleMonth, currentMonth }: Props) {
  return (
    <div className='flex flex-1 items-center md:mr-10'>
      <div
        className='flex w-10 cursor-pointer justify-start'
        onClick={() => handleMonth('previous')}
      >
        <ChevronDoubleLeftIcon
          width={30}
          className='text-indigo-500 dark:text-gray-300'
        />
      </div>
      <div className='flex-1 rounded-xl border bg-indigo-500 p-4 text-center text-sm font-medium text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white md:p-2 md:text-base'>
        {formatCurrentMonth(currentMonth)}
      </div>
      <div
        className='flex w-10 cursor-pointer justify-end'
        onClick={() => handleMonth('next')}
      >
        <ChevronDoubleRightIcon
          width={30}
          className='text-indigo-500 dark:text-gray-300'
        />
      </div>
    </div>
  );
}

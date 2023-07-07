import { formatCurrentMonth, splitDate } from '../../helpers/dateFilter';
import { ResumeItem } from '../ResumeItem';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/solid';

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
  incomeTotal: number;
  expenseTotal: number;
};

export const InfoArea = ({
  currentMonth,
  onMonthChange,
  income,
  expense,
  incomeTotal,
  expenseTotal
}: Props) => {
  const handleMonth = (signal?: string) => {
    const [year, month] = splitDate(currentMonth);
    const currentDate = new Date(year, month - 1, 1);
    signal === 'next'
      ? currentDate.setMonth(currentDate.getMonth() + 1)
      : currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  };

  return (
    <div className=' mx-[5%] mt-5 flex flex-col items-center gap-10 rounded-xl border bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:shadow md:flex-row md:border lg:mx-0 '>
      <div className='flex flex-1 items-center md:mr-10'>
        <div
          className='flex w-10 cursor-pointer justify-start'
          onClick={() => handleMonth('previous')}
        >
          <ChevronDoubleLeftIcon
            width={30}
            color='#4F46E5'
            className='dark:text-indigo-200'
          />
        </div>
        <div className='flex-1 rounded-xl border bg-indigo-500 p-2 text-center font-medium text-white dark:border-indigo-200 dark:bg-white dark:text-indigo-500'>
          {formatCurrentMonth(currentMonth)}
        </div>
        <div
          className='flex w-10 cursor-pointer justify-end'
          onClick={() => handleMonth('next')}
        >
          <ChevronDoubleRightIcon
            width={30}
            color='#4F46E5'
            className='dark:text-indigo-200'
          />
        </div>
      </div>
      <div className='flex flex-[2] gap-4 '>
        <ResumeItem title='Receitas' value={income} />
        <ResumeItem title='Despesas' value={expense} />
        <ResumeItem
          title='Balanço Mensal'
          value={income - expense}
          color={income - expense < 0 ? '#E45E5E' : '#44d337'}
        />
        <ResumeItem
          title='Balanço Total'
          value={incomeTotal - expenseTotal}
          color={incomeTotal - expenseTotal < 0 ? '#E45E5E' : '#44d337'}
        />
      </div>
    </div>
  );
};

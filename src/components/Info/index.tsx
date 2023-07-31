import { splitDate } from '../../helpers/dateFilter';
import DatePicker from './DatePicker';
import InfoItem from './InfoItem';

interface IInfoAreaProps {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
  incomeTotal: number;
  expenseTotal: number;
}

export default function Info({
  currentMonth,
  onMonthChange,
  income,
  expense,
  incomeTotal,
  expenseTotal
}: IInfoAreaProps) {
  const resumeField = [
    { title: 'Receitas', value: income },
    { title: 'Despesas', value: expense },
    {
      title: 'Balanço Mensal',
      value: income - expense,
      color: income - expense < 0 ? 'text-red-600' : 'text-lime-600 '
    },
    {
      title: 'Balanço Total',
      value: incomeTotal - expenseTotal,
      color: incomeTotal - expenseTotal < 0 ? 'text-red-600' : 'text-lime-600 '
    }
  ];

  function handleMonth(signal?: string) {
    const [year, month] = splitDate(currentMonth);
    const currentDate = new Date(year, month - 1, 1);
    signal === 'next'
      ? currentDate.setMonth(currentDate.getMonth() + 1)
      : currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  }

  return (
    <div
      className='mx-[5%] mt-5 flex flex-col items-center gap-10 rounded-xl border bg-white p-5 shadow-xl 
              dark:border-gray-700 dark:bg-gray-800 dark:shadow 
                md:w-[90%] md:flex-row md:border md:p-5 lg:mx-0 '
    >
      <DatePicker handleMonth={handleMonth} currentMonth={currentMonth} />
      <div className='flex flex-[2] gap-1 md:gap-3'>
        {resumeField.map((item, index) => (
          <InfoItem key={index} {...item} className={`${item.color}`} />
        ))}
      </div>
    </div>
  );
}

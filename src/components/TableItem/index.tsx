import { Item } from '../../types/Item';
import { formatDate } from '../../helpers/dateFilter';
import { CSSProperties } from 'react';
import { useFormContext } from '@/context/FormContext';
import { TrashIcon } from '@heroicons/react/24/solid';

type ItemProps = {
  item: Item;
};

export const TableItem = ({ item }: ItemProps) => {
  const { newCategory, list, setList } = useFormContext();

  const { category, date, title, value } = item;

  const bgCategory: CSSProperties = {
    backgroundColor: newCategory[category]?.color || 'inherit',
    border: newCategory[category]?.color || 'inherit'
  };

  const colorValue: CSSProperties = {
    color: newCategory[category]?.expense ? '#E45E5E' : '#44d337' || 'inherit'
  };

  function removeItem(itemDate: Date) {
    const newList = list.filter((item) => item.date !== itemDate);
    setList(newList);
    localStorage.setItem('lists', JSON.stringify(newList));
  }

  return (
    <div className='mt-4 flex w-full justify-between gap-4 md:gap-0 '>
      <div className='w-1/6 text-[10px] dark:text-white md:w-1/6  md:text-base'>
        {formatDate(date)}
      </div>
      <div
        className=' max-h-8 w-1/3 rounded-lg p-[0.75em] text-center text-[10px] font-medium text-white md:max-h-none md:w-1/6 md:max-w-none md:text-base'
        style={bgCategory}
      >
        {newCategory[category]?.title}
      </div>
      <div className='max-w-[80px] flex-1 break-words text-center text-xs text-gray-800 dark:text-gray-100 md:ml-12 md:max-w-full md:break-normal md:text-start md:text-base'>
        {title}
      </div>
      <div
        className='w-1/6 text-center text-xs font-medium text-gray-800 dark:text-gray-100 md:w-1/5 md:text-start md:text-base'
        style={colorValue}
      >
        R$ <br />
        {value}
      </div>
      <TrashIcon
        width={21}
        height={21}
        className='hidden cursor-pointer text-red-400 md:block'
        onClick={() => removeItem(date)}
      />
    </div>
  );
};

import { Item } from '../../types/Item';
import { formatDate } from '../../helpers/dateFilter';
import { CSSProperties } from 'react';
import { useFormContext } from '@/context/FormContext';
import { TrashIcon } from '@heroicons/react/24/solid';

type ItemProps = {
  item: Item;
};

export const TableItem = ({ item }: ItemProps) => {
  const { newCategory } = useFormContext();

  const { category, date, title, value } = item;

  const bgCategory: CSSProperties = {
    backgroundColor: newCategory[category].color || 'inherit',
    border: newCategory[category].color || 'inherit'
  };

  const colorValue: CSSProperties = {
    color: newCategory[category].expense ? '#E45E5E' : '#44d337' || 'inherit'
  };

  return (
    <div className='mt-4 flex justify-between'>
      <div className='w-1/6 dark:text-white'>{formatDate(date)}</div>
      <div
        className='inline-block w-1/6 rounded-lg p-3 text-center font-medium text-white'
        style={bgCategory}
      >
        {newCategory[category].title}
      </div>
      <div className='ml-16 flex-1 text-gray-800 dark:text-gray-100'>
        {title}
      </div>
      <div
        className='w-[12%] font-medium text-gray-800 dark:text-gray-100'
        style={colorValue}
      >
        R$ {value}
      </div>
      <TrashIcon
        width={22}
        height={22}
        className='cursor-pointer text-red-400'
      />
    </div>
  );
};

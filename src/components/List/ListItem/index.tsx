import { IItem } from '../../../types/Types';
import { MyUseFormContext } from '@/context/FormContext';
import { TrashIcon } from '@heroicons/react/24/solid';
import { categories } from '@/data/categories';

interface IItemProps {
  item: IItem;
}

export default function ListItem({ item }: IItemProps) {
  const { newCategory, list, setList } = MyUseFormContext();
  const { category, date, title, value } = item;
  console.log(newCategory[category]);
  console.log('hjhhjhj', categories);

  const bgCategory = {
    backgroundColor: newCategory[category]?.color
  };

  const colorValue = newCategory[category]?.expense
    ? 'text-red-600 dark:text-red-500'
    : 'text-lime-500 dark:text-lime-400';

  function removeItem(itemDate: Date) {
    const newList = list.filter((item) => item.date !== itemDate);
    setList(newList);
    localStorage.setItem('lists', JSON.stringify(newList));
  }

  function formatDate(date: Date) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');
    return formattedDate;
  }

  return (
    <div className='mt-4 flex w-full justify-between gap-4 md:gap-0'>
      <div className='w-1/6 text-[10px] dark:text-white md:w-1/6 md:text-sm lg:text-base'>
        {formatDate(date)}
      </div>
      <div
        className='max-h-8 w-1/3 rounded-lg p-[0.75em] text-center text-[10px] font-medium text-white md:max-h-none md:w-1/6 md:max-w-none md:text-sm lg:text-base'
        style={bgCategory}
      >
        {newCategory[category]?.title}
      </div>
      <div className='text max-w-[80px] flex-1 break-words text-center text-xs text-gray-900 dark:text-gray-100 md:ml-12 md:max-w-full md:break-normal md:text-start md:text-sm lg:text-base'>
        {title}
      </div>
      <div
        className={`w-1/6 text-center text-xs font-medium md:w-1/5 md:text-start md:text-sm lg:text-base ${colorValue}`}
      >
        R$ {value}
      </div>
      <TrashIcon
        width={21}
        height={21}
        className='hidden cursor-pointer text-red-500 md:block'
        onClick={() => removeItem(date)}
      />
    </div>
  );
}

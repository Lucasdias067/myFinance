import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';

type ItemProps = {
  list: Item[];
};

export const TableArea = ({ list }: ItemProps) => {
  return (
    <div className='mx-[5%] my-10 w-full rounded-lg border bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 lg:mx-0'>
      <div className='mb-6 flex justify-between font-bold'>
        <div className='w-1/6 text-gray-600 dark:text-gray-100'>Data</div>
        <div className='w-1/6 text-gray-600 dark:text-gray-100'>Categoria</div>
        <div className='ml-16 flex-1 text-gray-600 dark:text-gray-100'>
          Título
        </div>
        <div className='w-[15%] text-gray-600 dark:text-gray-100'>Valor</div>
      </div>
      <div className='mt-4'>
        {list.map((item, index) => (
          <TableItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

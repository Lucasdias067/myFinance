import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';

type ItemProps = {
  list: Item[];
};

export const TableArea = ({ list }: ItemProps) => {
  return (
    <div className='my-10 w-full max-w-[370px] rounded-lg border bg-white py-5 pl-2 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:mx-[5%] md:w-[90%]  md:max-w-7xl md:p-5 lg:mx-0'>
      <div className='mb-6 flex justify-between font-bold'>
        <div className='w-1/6 text-gray-600 dark:text-gray-100 md:w-1/6'>
          Data
        </div>
        <div className='w-1/3 text-start text-gray-600 dark:text-gray-100 md:w-1/6 md:text-start'>
          Categoria
        </div>
        <div className=' flex-1 text-center text-gray-600 dark:text-gray-100 md:ml-12 md:text-start'>
          Título
        </div>
        <div className='w-1/6 text-center text-gray-600 dark:text-gray-100 md:mr-[22px] md:w-1/5 md:text-start'>
          Valor
        </div>
      </div>
      <div className='mt-4'>
        {list.map((item, index) => (
          <TableItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

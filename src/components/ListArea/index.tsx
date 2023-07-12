import { Item } from '../../types/Types';
import { ColumnItem } from './ColumnItem';
import { ListItem } from './ListItem';

type ListProps = {
  filteredList: Item[];
};

export default function ListArea({ filteredList }: ListProps) {
  return (
    <div className='my-10 w-full max-w-[370px] rounded-lg border bg-white py-5 pl-2 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:mx-[5%] md:w-[90%]  md:max-w-7xl md:p-5 lg:mx-0'>
      <ColumnItem />
      <div className='mt-4'>
        {filteredList.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

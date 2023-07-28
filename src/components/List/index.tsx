import { IItem } from '../../types/Types';
import ColumnItem from './ColumnItem';
import ListItem from './ListItem';

interface IList {
  filteredList: IItem[];
}

export default function List({ filteredList }: IList) {
  return (
    <div className='my-10 w-full rounded-lg border bg-white py-5 pl-2 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:mx-[5%] md:w-[90%]  md:max-w-7xl md:p-5 lg:mx-0'>
      <ColumnItem />
      <div className='mt-4'>
        {filteredList.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

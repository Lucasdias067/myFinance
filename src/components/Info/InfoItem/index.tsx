import { twMerge } from 'tailwind-merge';
interface IInfoItem extends React.ComponentProps<'div'> {
  title: string;
  value: number;
}

export default function InfoItem({ title, value, className }: IInfoItem) {
  return (
    <div className='flex flex-1 flex-col justify-between gap-2  font-medium '>
      <div className='flex h-full items-center justify-center text-center text-sm font-bold text-gray-600 dark:text-white lg:text-base'>
        <span>{title}</span>
      </div>
      <div
        className={twMerge(
          'flex h-16 w-full flex-col items-center justify-center rounded-lg border border-gray-300 py-2 text-center text-[10px] font-bold text-gray-600 dark:bg-white md:text-xs lg:text-sm',
          className
        )}
      >
        <span>R$</span>
        <span>{value.toFixed(2)}</span>
      </div>
    </div>
  );
}

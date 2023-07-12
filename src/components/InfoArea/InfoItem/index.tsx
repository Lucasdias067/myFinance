import { CSSProperties } from 'react';

type InfoItemProps = {
  title: string;
  value: number;
  color?: string;
};

export default function InfoItem({ title, value, color }: InfoItemProps) {
  const itemStyle: CSSProperties = {
    color: color || '#4B5563'
  };

  return (
    <div className='flex flex-1 flex-col justify-between  font-medium '>
      <div className='b-1 text-center font-bold text-gray-600 dark:text-white '>
        {title}
      </div>
      <div
        className='rounded-lg py-2 text-center text-xs font-bold text-gray-600 dark:bg-white md:text-base '
        style={itemStyle}
      >
        R$ {value}
      </div>
    </div>
  );
}

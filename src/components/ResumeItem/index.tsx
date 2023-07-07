import { CSSProperties } from 'react';

type ResumeItemProps = {
  title: string;
  value: number;
  color?: string;
};

export const ResumeItem = ({ title, value, color }: ResumeItemProps) => {
  const itemStyle: CSSProperties = {
    color: color || 'black'
  };

  return (
    <div className='flex flex-1 flex-col justify-between  font-medium '>
      <div className='b-1 text-center font-bold text-black dark:text-white '>
        {title}
      </div>
      <div
        className='rounded-lg py-2 text-center text-xs font-bold dark:bg-white md:text-base '
        style={itemStyle}
      >
        R$ {value}
      </div>
    </div>
  );
};

import { twMerge } from 'tailwind-merge';

interface ILabelProps extends React.ComponentProps<'label'> {
  children: React.ReactNode;
  name?: string;
}

export function Label({ children, name, className, ...props }: ILabelProps) {
  return (
    <label
      className={twMerge(
        'mx-2 mt-6 w-full flex-1 font-medium text-gray-600 dark:text-gray-100 md:my-0 md:h-24',
        className
      )}
      {...props}
    >
      {name && (
        <div className='mb-1 h-6 text-sm font-bold lg:text-base'>{name}</div>
      )}
      {children}
    </label>
  );
}

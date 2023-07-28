import { useFormContext } from 'react-hook-form';

interface ISelectProps extends React.ComponentProps<'select'> {
  name: string;
  children: React.ReactNode;
}

export function Select({ name, children, ...rest }: ISelectProps) {
  const { register } = useFormContext();

  return (
    <select
      className='block h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white'
      {...register(name)}
      {...rest}
    >
      {children}
    </select>
  );
}

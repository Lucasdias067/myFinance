import { useFormContext } from 'react-hook-form';

interface IInputProps extends React.ComponentProps<'input'> {
  name: string;
}

export function Input({ name, ...rest }: IInputProps) {
  const { register } = useFormContext();

  return (
    <input
      className='h-10 w-full rounded-lg border border-gray-300 px-2 text-sm 
                focus:border-indigo-500 focus:outline-none 
                dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400'
      {...register(name)}
      {...rest}
    />
  );
}

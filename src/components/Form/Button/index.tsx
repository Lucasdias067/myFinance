import { useFormContext } from 'react-hook-form';

interface IButtonProps extends React.ComponentProps<'button'> {
  text: string;
}

export function SubmitButton({ text, ...rest }: IButtonProps) {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <button
      disabled={Object.keys(errors).length > 0}
      type='submit'
      className='h-12 w-full rounded-lg bg-indigo-500 px-4 text-center text-sm font-medium text-white transition
                 duration-300 ease-in hover:bg-indigo-800 dark:bg-white 
                dark:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-white lg:text-base'
      {...rest}
    >
      {text}
    </button>
  );
}

export function CancelButton({ text, ...rest }: IButtonProps) {
  return (
    <button
      className='h-12 flex-1 rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium 
                 text-gray-700 transition duration-300 ease-in hover:bg-gray-400 dark:bg-gray-600
                dark:text-gray-200 dark:hover:bg-gray-500 lg:text-base'
      {...rest}
    >
      {text}
    </button>
  );
}

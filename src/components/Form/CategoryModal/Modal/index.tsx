import { CancelButton, SubmitButton } from '../../Button';

interface IModal {
  onSubmitFunction: () => void;
  onClick: () => void;
  text: string;
  children: React.ReactNode;
}

export default function Modal({
  children,
  text,
  onClick,
  onSubmitFunction
}: IModal) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center '>
      <div className='absolute inset-0 bg-gray-900 opacity-75 dark:bg-gray-900'></div>
      <form
        onSubmit={onSubmitFunction}
        className='relative rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 '
      >
        <div className='mb-7'>{children}</div>
        <div className='flex items-center gap-4'>
          <SubmitButton text={text} />
          <CancelButton text='Cancelar' onClick={onClick} />
        </div>
      </form>
    </div>
  );
}

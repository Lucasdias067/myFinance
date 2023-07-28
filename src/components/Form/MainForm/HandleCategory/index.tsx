import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

interface ICategory {
  openModal: () => void;
  closeModal: () => void;
}

export default function HandleCategory({ openModal, closeModal }: ICategory) {
  return (
    <div className='mb-1 flex h-6 justify-between text-sm font-bold lg:text-base'>
      Categoria
      <div className='flex items-center'>
        <MinusCircleIcon
          width={25}
          className='ml-1 text-red-600'
          onClick={closeModal}
        />
        <PlusCircleIcon
          width={25}
          className='ml-1 text-lime-500'
          onClick={openModal}
        />
      </div>
    </div>
  );
}

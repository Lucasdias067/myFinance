export const ColumnItem = () => {
  return (
    <div className='mb-6 flex justify-between font-bold'>
      <div className='w-1/6 text-gray-600 dark:text-gray-100 md:w-1/6'>
        Data
      </div>
      <div className='w-1/3 text-start text-gray-600 dark:text-gray-100 md:w-1/6 md:text-start'>
        Categoria
      </div>
      <div className=' flex-1 text-center text-gray-600 dark:text-gray-100 md:ml-12 md:text-start'>
        Título
      </div>
      <div className='w-1/6 text-center text-gray-600 dark:text-gray-100 md:mr-[22px] md:w-1/5 md:text-start'>
        Valor
      </div>
    </div>
  );
};

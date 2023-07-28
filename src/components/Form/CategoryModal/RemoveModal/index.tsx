import { Label } from '../../Label';
import { CancelButton, SubmitButton } from '../../Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { MyUseFormContext } from '@/context/FormContext';
import { Select } from '../../Select';
import { HandleError } from '../../MainForm/HandleError';

interface IRemoveModal {
  closeModal: () => void;
}

export default function RemoveModal({ closeModal }: IRemoveModal) {
  const { newCategory, categoryKeys, list, removingCategory } =
    MyUseFormContext();

  const removeCategoryKey = categoryKeys.filter(
    (key) => key !== 'food' && key !== 'rent' && key !== 'salary'
  );

  const removeModalSchema = z.object({
    removeCategoryKey: z
      .enum(['', ...removeCategoryKey])
      .refine((val) => val.length > 0, 'Adicione uma categoria')
      .refine((val) => {
        const isCategoryActive = list.some(({ category }) => category === val);
        return !isCategoryActive;
      }, 'Remova a categoria existente')
  });

  type RemoveModalSchema = z.infer<typeof removeModalSchema>;

  const createRemoveModal = useForm<RemoveModalSchema>({
    resolver: zodResolver(removeModalSchema)
  });

  const { handleSubmit } = createRemoveModal;

  function removeCategory(data: RemoveModalSchema) {
    removingCategory(data.removeCategoryKey);
    closeModal();
  }

  return (
    <FormProvider {...createRemoveModal}>
      <div className='fixed inset-0 z-50 flex items-center justify-center '>
        <div className='absolute inset-0 bg-gray-900 opacity-75 dark:bg-gray-900'></div>
        <form
          onSubmit={handleSubmit(removeCategory)}
          className='relative rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 '
        >
          <div className='mb-7'>
            <Label name='Remover Categoria:' className='m-0'>
              <Select name='removeCategoryKey'>
                <option disabled></option>
                {removeCategoryKey.map((key, index) => (
                  <option key={index} value={key}>
                    {newCategory[key].title}
                  </option>
                ))}
              </Select>
              <HandleError name='removeCategoryKey' />
            </Label>
          </div>
          <div className='flex items-center gap-4'>
            <SubmitButton text='Remover' />
            <CancelButton text='Cancelar' onClick={closeModal} />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

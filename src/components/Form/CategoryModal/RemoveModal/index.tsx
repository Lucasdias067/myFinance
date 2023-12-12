import { Label } from '../../Label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { MyUseFormContext } from '@/context/FormContext';
import { Select } from '../../Select';
import { HandleError } from '../../MainForm/HandleError';
import Modal from '../Modal';

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
      <Modal
        text='Remover'
        onSubmitFunction={handleSubmit(removeCategory)}
        onClick={closeModal}
      >
        <Label name='Remover Categoria:' className='m-0'>
          <Select name='removeCategoryKey'>
            {removeCategoryKey.map((key, index) => (
              <option key={index} value={key}>
                {newCategory[key].title}
              </option>
            ))}
          </Select>
          <HandleError name='removeCategoryKey' />
        </Label>
      </Modal>
    </FormProvider>
  );
}

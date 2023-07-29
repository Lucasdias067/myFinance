import { MyUseFormContext } from '@/context/FormContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { HandleError } from '../../MainForm/HandleError';
import { Label } from '../../Label';
import { Input } from '../../Input';
import { Select } from '../../Select';
import Modal from '../Modal';

const addModalSchema = z.object({
  title: z
    .string()
    .nonempty('Informe o título da categoria')
    .refine((val) => val.trim().length > 0, 'Título inválido')
    .transform((val) => val.trim()),
  color: z.string().nonempty('Informe a cor da categoria'),
  expense: z
    .enum(['Despesa', 'Receita'], {
      errorMap: (issue, _ctx) => {
        return issue.code === 'invalid_enum_value'
          ? { message: 'Obrigatório' }
          : { message: 'Inválido' };
      }
    })
    .transform((val) => val === 'Despesa')
});

type ModalSchema = z.infer<typeof addModalSchema>;

interface IAddModal {
  openModal: () => void;
}

export default function AddModal({ openModal }: IAddModal) {
  const { newCategory, setNewCategory } = MyUseFormContext();

  const createAddModal = useForm<ModalSchema>({
    resolver: zodResolver(addModalSchema)
  });

  const { handleSubmit, reset } = createAddModal;

  function addCategory(data: ModalSchema) {
    if (Object.keys(newCategory).indexOf(data.title) !== -1)
      return alert('Já existe uma categoria com esse nome');

    setNewCategory({
      ...newCategory,
      [data.title]: data
    });
    openModal();
    reset();
  }

  return (
    <FormProvider {...createAddModal}>
      <Modal
        text='Adicionar'
        onSubmitFunction={handleSubmit(addCategory)}
        onClick={openModal}
      >
        <Label name='Categoria:' className='mx-0'>
          <Input name='title' type='text' />
          <HandleError name='title' />
        </Label>
        <Label name='Escolha uma cor:'>
          <Input name='color' type='color' />
          <HandleError name='color' />
        </Label>
        <Label name='Receita ou Despesa:'>
          <Select name='expense'>
            <option></option>
            <option value={'Receita'}>Receita</option>
            <option value={'Despesa'}>Despesa</option>
          </Select>
          <HandleError name='expense' />
        </Label>
      </Modal>
    </FormProvider>
  );
}

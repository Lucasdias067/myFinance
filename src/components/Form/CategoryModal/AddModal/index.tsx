import { MyUseFormContext } from '@/context/FormContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { HandleError } from '../../MainForm/HandleError';
import { Label } from '../../Label';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { CancelButton, SubmitButton } from '../../Button';

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
      <div className='fixed inset-0 z-50 flex items-center justify-center '>
        <div className='absolute inset-0 bg-gray-900 opacity-75 dark:bg-gray-900'></div>
        <form
          onSubmit={handleSubmit(addCategory)}
          className='relative rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 '
        >
          <div className='mb-7'>
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
          </div>
          <div className='flex items-center gap-4'>
            <SubmitButton text='Salvar' />
            <CancelButton text='Cancelar' onClick={openModal} />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

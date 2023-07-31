import { MyUseFormContext } from '@/context/FormContext';
import { IItem } from '@/types/Types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import HandleCategory from './HandleCategory';
import { HandleError } from './HandleError';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select } from '../Select';
import { SubmitButton } from '../Button';

const listDataSchema = z.object({
  date: z.coerce
    .date({
      errorMap: (issue) => {
        if (issue.code.length) return { message: 'Data é obrigatória' };
        return { message: 'Data é obrigatória' };
      }
    })
    .min(new Date('2022-01-01'), { message: 'Coloque uma data recente' })
    .transform((value) => {
      const utcYear = value.getUTCFullYear();
      const utcMonth = value.getUTCMonth();
      const utcDay = value.getUTCDate() + 1;
      return new Date(Date.UTC(utcYear, utcMonth, utcDay));
    }),
  category: z.string().nonempty('Categoria é obrigatória'),
  title: z
    .string()
    .max(25, 'Máximo 25 caracteres')
    .nonempty('Título é obrigatório')
    .refine((val) => val.trim().length > 0, 'Título inválido')
    .transform((val) => val.trim()),
  value: z.coerce
    .number()
    .positive('Valor inválido')
    .lte(999999999, 'Máximo de caracteres')
    .safe('Valor elevado')
    .transform((value) => value.toString())
});

interface IMainForm {
  onAdd: (item: IItem) => void;
  openModal: () => void;
  closeModal: () => void;
}

type TListData = z.infer<typeof listDataSchema>;

export default function MainForm({ onAdd, openModal, closeModal }: IMainForm) {
  const { newCategory, categoryKeys } = MyUseFormContext();

  const createListData = useForm<TListData>({
    resolver: zodResolver(listDataSchema)
  });

  const { handleSubmit, reset } = createListData;

  function createData(data: TListData) {
    onAdd({
      date: data.date,
      category: data.category,
      title: data.title,
      value: data.value
    });
    reset();
  }

  return (
    <FormProvider {...createListData}>
      <form
        onSubmit={handleSubmit(createData)}
        className='mt-5 flex w-[90%] flex-col items-center rounded-lg border bg-white p-5 pt-0 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:w-[90%] md:flex-row md:pt-5 lg:mx-0'
      >
        <Label name='Data'>
          <Input type='date' name='date' />
          <HandleError name='date' />
        </Label>
        <Label>
          <HandleCategory openModal={openModal} closeModal={closeModal} />
          <Select name='category'>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {newCategory[key].title}
              </option>
            ))}
          </Select>
          <HandleError name='category' />
        </Label>
        <Label name='Título'>
          <Input type='text' name='title' placeholder='Digite o título' />
          <HandleError name='title' />
        </Label>
        <Label name='Valor'>
          <Input
            type='number'
            step='0.01'
            name='value'
            placeholder='Digite o valor'
          />
          <HandleError name='value' />
        </Label>
        <div className='mx-2 mt-6 flex w-full flex-1 items-center font-medium md:mt-0 md:h-24'>
          <SubmitButton text='Adicionar' />
        </div>
      </form>
    </FormProvider>
  );
}

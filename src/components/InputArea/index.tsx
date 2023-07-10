import { ChangeEvent, useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import { newDateAdjusted } from '../../helpers/dateFilter';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useFormContext } from '@/context/FormContext';
import { Category } from '@/types/Category';

type Props = {
  onAdd: (item: Item) => void;
};

export const FormArea = ({ onAdd }: Props) => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [removeCategoryModal, setRemoveCategoryModal] = useState(false);
  const [categoryKey, setCategoryKey] = useState('');
  const [userData, setUserData] = useState({
    date: '',
    category: '',
    title: '',
    values: ''
  });

  const [userNewCategory, setUserNewCategory] = useState({
    categoryTitle: '',
    categoryColor: '',
    categoryExpense: ''
  });

  const { newCategory, setNewCategory, list } = useFormContext();

  const categoryKeys = Object.keys(newCategory);
  const { date, category, title, values } = userData;
  const { categoryTitle, categoryColor, categoryExpense } = userNewCategory;

  const handleUserData = () => {
    const errors: string[] = [];

    if (isValidDate(date)) errors.push('Data inválida!');
    if (!categoryKeys.includes(category)) errors.push('Categoria inválida!');
    if (title === '') errors.push('Título vazio!');
    if (values.match(/[^0-9]/g) || values === '')
      errors.push('Valor inválido!');

    if (errors.length > 0) return alert(errors.join('\n'));
    resetUserData();
  };

  function resetUserData() {
    onAdd({
      date: newDateAdjusted(date),
      category,
      title,
      value: values
    });

    setUserData({ date: '', category: '', title: '', values: '' });
  }

  function isValidDate(date: string) {
    return isNaN(new Date(date).getTime());
  }

  function userDataHandleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleNewCategory(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUserNewCategory({ ...userNewCategory, [name]: value });
  }

  function addCategory(category: typeof userNewCategory) {
    if (
      categoryTitle === '' ||
      categoryColor === '' ||
      categoryExpense === ''
    ) {
      alert('Preencha todos os campos!');
      return;
    }
    const pushingCategory = {
      title: category.categoryTitle,
      color: category.categoryColor,
      expense: category.categoryExpense === 'Despesa'
    };

    console.log(pushingCategory);

    setNewCategory({
      ...newCategory,
      [pushingCategory.title]: pushingCategory
    });
    setAddCategoryModal(!addCategoryModal);
    setUserNewCategory({
      categoryTitle: '',
      categoryColor: '',
      categoryExpense: ''
    });
  }

  function removeCategory(removingCategory: Category) {
    const theNewCategory = Object.keys(removingCategory).filter(
      (el: string) => el === categoryKey
    );
    const isCategoryActive = list.some(
      (el) => el.category === theNewCategory[0]
    );
    if (isCategoryActive) return alert('Remova os itens da categoria primeiro');
    const key = removingCategory[theNewCategory[0]];
    delete removingCategory[key.title];
    setNewCategory({ ...removingCategory });
    localStorage.setItem('category', JSON.stringify(newCategory));
    setRemoveCategoryModal(!removeCategoryModal);
  }

  useEffect(() => {
    if (Object.keys(newCategory).length === 3) return;
    localStorage.setItem('category', JSON.stringify(newCategory));
  }, [newCategory]);

  useEffect(() => {
    const category = localStorage.getItem('category') || '';
    const categoryParsed = !!category && JSON.parse(category);
    if (categoryParsed) setNewCategory(categoryParsed);
  }, [setNewCategory]);

  return (
    <div>
      <div className='mx-[5%] mt-5 flex flex-col items-center rounded-lg border bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 md:flex-row lg:mx-0'>
        <label className='m-2 w-full flex-1 font-medium text-gray-900 dark:text-gray-100'>
          <div className='mb-2 font-bold'>Data</div>
          <input
            className='h-10 w-full rounded-lg border border-gray-300 px-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400'
            type='date'
            value={date}
            onChange={userDataHandleChange}
            name='date'
          />
        </label>
        <label className='m-2 w-full flex-1 font-medium text-gray-900 dark:text-gray-100'>
          <div className='mb-2 flex justify-between font-bold'>
            Categoria
            <div className='flex items-center'>
              <MinusCircleIcon
                width={25}
                className='ml-1 text-red-500 dark:text-red-500'
                onClick={() => setRemoveCategoryModal(!removeCategoryModal)}
              />
              <PlusCircleIcon
                width={25}
                className='ml-1 text-green-500 dark:text-green-400'
                onClick={() => setAddCategoryModal(!addCategoryModal)}
              />
            </div>
          </div>
          <select
            className='h-10 w-full rounded-lg border border-gray-300 px-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400'
            value={category}
            onChange={userDataHandleChange}
            name='category'
          >
            <option disabled></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {newCategory[key].title}
              </option>
            ))}
          </select>
        </label>
        <label className='m-2 w-full flex-1 font-medium text-gray-900 dark:text-gray-100'>
          <div className='mb-2 font-bold'>Título</div>
          <input
            className='h-10 w-full rounded-lg border border-gray-300 px-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400'
            type='text'
            value={title}
            onChange={userDataHandleChange}
            name='title'
            placeholder='Digite o título'
            maxLength={25}
          />
        </label>
        <label className='m-2 w-full flex-1 font-medium text-gray-900 dark:text-gray-100'>
          <div className='mb-2 font-bold'>Valor</div>
          <input
            className='h-10 w-full rounded-lg border border-gray-300 px-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400'
            type='text'
            value={values}
            onChange={userDataHandleChange}
            name='values'
            placeholder='Digite o valor'
            maxLength={5}
          />
        </label>
        <div className='m-2 w-full flex-1 font-medium'>
          <div className='mb-1 font-bold'>&nbsp;</div>
          <button
            className='h-10 w-full rounded-lg bg-indigo-500 px-4 text-center text-white transition duration-300 ease-in hover:bg-indigo-800 dark:bg-white dark:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-white'
            onClick={handleUserData}
          >
            Adicionar
          </button>
        </div>
      </div>
      {addCategoryModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center '>
          <div className='absolute inset-0 bg-gray-900 opacity-75 dark:bg-gray-900'></div>
          <div className='relative rounded-lg bg-white p-5 shadow-xl dark:bg-gray-800 '>
            <div className='mb-7'>
              <label className='mb-2 block font-medium text-gray-900 dark:text-gray-100'>
                Categoria:
                <input
                  value={categoryTitle}
                  onChange={handleNewCategory}
                  name='categoryTitle'
                  type='text'
                  className='block h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                />
              </label>
              <label className='mb-4 block  font-medium text-gray-900 dark:text-gray-100'>
                Escolha a cor:
                <input
                  value={categoryColor}
                  onChange={handleNewCategory}
                  name='categoryColor'
                  type='color'
                  className='block h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                />
              </label>
              <select
                value={categoryExpense}
                onChange={handleNewCategory}
                name='categoryExpense'
                className='block h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white'
              >
                <option disabled></option>
                <option value={'Receita'}>Receita</option>
                <option value={'Despesa'}>Despesa</option>
              </select>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => addCategory(userNewCategory)}
                className='flex-1 rounded-lg  bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600'
              >
                Salvar
              </button>
              <button
                onClick={() => setAddCategoryModal(!addCategoryModal)}
                className='flex-1 rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {removeCategoryModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center '>
          <div className='absolute inset-0 bg-gray-900 opacity-75 dark:bg-gray-900'></div>
          <div className='relative rounded-lg bg-white p-5 shadow-xl dark:bg-gray-800 '>
            <div className='mb-7'>
              <select
                value={categoryKey}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCategoryKey(e.target.value)
                }
                className='block h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white'
              >
                <option disabled></option>
                {categoryKeys.map((key, index) => {
                  if (key !== 'food' && key !== 'rent' && key !== 'salary') {
                    return (
                      <option key={index} value={key}>
                        {newCategory[key].title}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => removeCategory(newCategory)}
                className='flex-1 rounded-lg  bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600'
              >
                Remover
              </button>
              <button
                onClick={() => setRemoveCategoryModal(!removeCategoryModal)}
                className='flex-1 rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

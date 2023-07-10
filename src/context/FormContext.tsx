'use client';
import { categories } from '@/data/categories';
import { Category } from '@/types/Category';
import { Item } from '@/types/Item';
import { useContext, createContext, useState } from 'react';

type childrenProps = { children: React.ReactNode };
interface categoryContextProps {
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const FormContext = createContext({} as categoryContextProps);
export const FormProvider = ({ children }: childrenProps) => {
  const [newCategory, setNewCategory] = useState<Category>(categories);
  const [list, setList] = useState<Item[]>([]);

  return (
    <FormContext.Provider
      value={{
        newCategory,
        setNewCategory,
        list,
        setList
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const { newCategory, setNewCategory, list, setList } =
    useContext(FormContext);

  return { newCategory, setNewCategory, list, setList };
};

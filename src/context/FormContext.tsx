'use client';
import { categories } from '@/data/categories';
import { Category, Item, childrenProps } from '@/types/Types';
import { useContext, createContext, useState } from 'react';

interface categoryContextProps {
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const FormContext = createContext({} as categoryContextProps);

export default function FormProvider({ children }: childrenProps) {
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
}

export function useFormContext() {
  const { newCategory, setNewCategory, list, setList } =
    useContext(FormContext);

  return { newCategory, setNewCategory, list, setList };
}

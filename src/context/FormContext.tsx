import { categories } from '@/data/categories';
import { Category } from '@/types/Category';
import { useContext, createContext, useState } from 'react';

type childrenProps = { children: React.ReactNode };
interface categoryContextProps {
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const FormContext = createContext({} as categoryContextProps);
export const FormProvider = ({ children }: childrenProps) => {
  const [newCategory, setNewCategory] = useState<Category>(categories);

  return (
    <FormContext.Provider
      value={{
        newCategory,
        setNewCategory
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const { newCategory, setNewCategory } = useContext(FormContext);

  return { newCategory, setNewCategory };
};

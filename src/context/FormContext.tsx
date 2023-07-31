'use client';
import { categories } from '@/data/categories';
import { ICategory, IItem, IChildrenProps } from '@/types/Types';
import { useContext, createContext, useState, useEffect } from 'react';

interface IcategoryContext {
  newCategory: ICategory;
  setNewCategory: React.Dispatch<React.SetStateAction<ICategory>>;
  list: IItem[];
  setList: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const FormContext = createContext({} as IcategoryContext);

export default function FormProvider({ children }: IChildrenProps) {
  const [newCategory, setNewCategory] = useState<ICategory>(categories);
  const [list, setList] = useState<IItem[]>([]);

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

export function MyUseFormContext() {
  const { newCategory, setNewCategory, list, setList } =
    useContext(FormContext);

  const categoryKeys = Object.keys(newCategory);

  const [removeCategoryModal, setRemoveCategoryModal] = useState(false);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  function removingCategory(myCategory: string) {
    const theNewCategory = categoryKeys.filter(
      (category) => category === myCategory
    );
    const removingCategoryKey = newCategory[theNewCategory[0]];
    delete newCategory[removingCategoryKey.title];
    setNewCategory({ ...newCategory });
    localStorage.setItem('category', JSON.stringify(newCategory));
  }

  function closeModal() {
    setRemoveCategoryModal(!removeCategoryModal);
  }

  function openModal() {
    setAddCategoryModal(!addCategoryModal);
  }

  useEffect(() => {
    if (list && list.length) {
      localStorage.setItem('lists', JSON.stringify(list));
    }
  }, [list]);

  useEffect(() => {
    const initialList = localStorage.getItem('lists');
    if (!initialList) return;

    const listParsed = JSON.parse(initialList);
    const updatedlist = listParsed.map((el: IItem) => {
      const myDate = new Date(el.date);
      return { ...el, date: myDate };
    });

    setList([...updatedlist]);
  }, [setList]);

  useEffect(() => {
    if (Object.keys(newCategory).length === 3) return;
    localStorage.setItem('category', JSON.stringify(newCategory));
  }, [newCategory]);

  useEffect(() => {
    const category = localStorage.getItem('category');
    if (category) {
      const categoryParsed = JSON.parse(category);
      setNewCategory(categoryParsed);
    }
  }, [setNewCategory]);

  return {
    categoryKeys,
    newCategory,
    setNewCategory,
    list,
    setList,
    addCategoryModal,
    removeCategoryModal,
    removingCategory,
    closeModal,
    openModal
  };
}

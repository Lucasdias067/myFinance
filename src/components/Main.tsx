'use client';
import { InfoArea } from '@/components/InfoArea';
import { FormArea } from '@/components/InputArea';
import { TableArea } from '@/components/TableArea';
import { filterListByMonth, getCurrentMonth } from '@/helpers/dateFilter';
import { Item } from '@/types/Item';
import { useEffect, useState } from 'react';
import ToggleTheme from '../app/Toggletheme';
import { useFormContext } from '@/context/FormContext';

export default function Main() {
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [balance, setBalance] = useState({
    income: 0,
    expense: 0,
    incomeTotal: 0,
    expenseTotal: 0
  });

  const { newCategory, list, setList } = useFormContext();
  const { income, expense, incomeTotal, expenseTotal } = balance;

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;
    let incomeCountTotal = 0;
    let expenseCountTotal = 0;

    if (filteredList.length) {
      filteredList.forEach(({ category, value }) => {
        if (newCategory[category]?.expense) {
          expenseCount += Number(value);
        } else {
          incomeCount += Number(value);
        }
      });
    }

    if (list.length) {
      list.forEach(({ category, value }) => {
        if (newCategory[category]?.expense) {
          expenseCountTotal += Number(value);
        } else {
          incomeCountTotal += Number(value);
        }
      });
    }

    setBalance({
      income: incomeCount,
      expense: expenseCount,
      incomeTotal: incomeCountTotal,
      expenseTotal: expenseCountTotal
    });
  }, [list, filteredList, newCategory]);

  useEffect(() => {
    if (list && list.length) {
      localStorage.setItem('lists', JSON.stringify(list));
    }
  }, [list]);

  useEffect(() => {
    const initialList = localStorage.getItem('lists');
    if (initialList) {
      const listParsed = JSON.parse(initialList);

      const findDate = listParsed.map((el: Item) => {
        const date = new Date(el.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      });

      const updatedlist: Item[] = listParsed.map((el: Item, index: number) => {
        return { ...el, date: findDate[index].toString() };
      });

      setList([...updatedlist]);
    }
  }, [setList, currentMonth]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    setList((prevState) => [...prevState, item]);
  };

  return (
    <main className='flex h-max flex-col items-center bg-slate-200 bg-gradient-to-t from-white dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 md:h-full md:min-h-screen'>
      <section className='flex h-48 w-full items-center justify-center bg-slate-900 bg-gradient-to-t from-slate-200 text-center dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-700'>
        <h1 className='text-4xl font-bold text-slate-800 dark:text-zinc-100 md:text-5xl'>
          Sistema de Finanças Pessoais
        </h1>
        <ToggleTheme />
      </section>
      <section className='mt-7 flex max-w-4xl flex-col items-center lg:min-w-[1024px]'>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          incomeTotal={incomeTotal}
          expenseTotal={expenseTotal}
        />
        <FormArea onAdd={handleAddItem} />
        <TableArea list={filteredList} />
      </section>
    </main>
  );
}

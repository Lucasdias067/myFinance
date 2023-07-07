'use client';
import { InfoArea } from '@/components/InfoArea';
import { FormArea } from '@/components/InputArea';
import { TableArea } from '@/components/TableArea';
import { filterListByMonth, getCurrentMonth } from '@/helpers/dateFilter';
import { Item } from '@/types/Item';
import { useEffect, useState } from 'react';
import ToggleTheme from './Toggletheme';
import { useFormContext } from '@/context/FormContext';

export default function Home() {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const { newCategory } = useFormContext();

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    filteredList.forEach(({ category, value }) => {
      if (newCategory[category].expense) {
        expenseCount += Number(value);
      } else {
        incomeCount += Number(value);
      }
    });

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList, newCategory]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    list.forEach(({ category, value }) => {
      if (newCategory[category].expense) {
        expenseCount += Number(value);
      } else {
        incomeCount += Number(value);
      }
    });

    setIncomeTotal(incomeCount);
    setExpenseTotal(expenseCount);
  }, [list, newCategory]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    setList((prevState) => [...prevState, item]);
  };
  return (
    <main className='flex h-max flex-col items-center dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 md:h-full md:min-h-screen'>
      <section className='flex h-48 w-full items-center justify-center bg-slate-800 bg-gradient-to-t from-white text-center dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-700'>
        <h1 className='text-4xl font-bold text-slate-800 dark:text-zinc-100 md:text-5xl'>
          Sistema de Finanças Pessoais
        </h1>
        <ToggleTheme />
      </section>
      <section className='mt-7 max-w-4xl lg:min-w-[1024px]'>
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

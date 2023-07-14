'use client';
import { useEffect, useState } from 'react';
import Info from '@/components/Info';
import Form from '@/components/Form';
import List from '@/components/List';
import { filterListByMonth, getCurrentMonth } from '@/helpers/dateFilter';
import { Item } from '@/types/Types';
import { useFormContext } from '@/context/FormContext';
import MainHeader from './MainHeader';

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
    function filterBalance(lists: Item[], expenses: number, incomes: number) {
      if (lists.length) {
        lists.forEach(({ category, value }) => {
          newCategory[category]?.expense
            ? (expenses += Number(value))
            : (incomes += Number(value));
        });
      }
      return { expenses, incomes };
    }

    const expenseCount = 0;
    const incomeCount = 0;
    const expenseCountTotal = 0;
    const incomeCountTotal = 0;

    const filteredBalance = filterBalance(
      filteredList,
      expenseCount,
      incomeCount
    );

    const totalBalance = filterBalance(
      list,
      expenseCountTotal,
      incomeCountTotal
    );

    setBalance({
      income: filteredBalance.incomes,
      expense: filteredBalance.expenses,
      incomeTotal: totalBalance.incomes,
      expenseTotal: totalBalance.expenses
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
    <main
      className='flex h-max flex-col items-center bg-slate-200 bg-gradient-to-t from-white 
              dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 
                md:h-full md:min-h-screen'
    >
      <MainHeader />
      <section className='mt-7 flex max-w-4xl flex-col items-center lg:min-w-[1024px]'>
        <Info
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          incomeTotal={incomeTotal}
          expenseTotal={expenseTotal}
        />
        <Form onAdd={handleAddItem} />
        <List filteredList={filteredList} />
      </section>
    </main>
  );
}

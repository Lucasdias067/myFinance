'use client';
import { useEffect, useState } from 'react';
import Info from '@/components/Info';
import Form from '@/components/Form';
import List from '@/components/List';
import MainHeader from './MainHeader';
import { filterListByMonth, getCurrentMonth } from '@/helpers/dateFilter';
import { IItem } from '@/types/Types';
import { MyUseFormContext } from '@/context/FormContext';

export default function Main() {
  const [filteredList, setFilteredList] = useState<IItem[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [balance, setBalance] = useState({
    income: 0,
    expense: 0,
    incomeTotal: 0,
    expenseTotal: 0
  });

  const { newCategory, list, setList } = MyUseFormContext();
  const { income, expense, incomeTotal, expenseTotal } = balance;

  useEffect(() => {
    const filteredListByMonth = filterListByMonth(list, currentMonth);
    setFilteredList(filteredListByMonth);
  }, [list, currentMonth]);

  useEffect(() => {
    function filterBalance(lists: IItem[], expenses: number, incomes: number) {
      if (lists && lists.length) {
        lists.forEach(({ category, value }) => {
          newCategory[category]?.expense
            ? (expenses += Number(value))
            : (incomes += Number(value));
        });
      }
      return { expenses, incomes };
    }

    const filteredBalance = filterBalance(filteredList, 0, 0);
    const totalBalance = filterBalance(list, 0, 0);

    setBalance({
      income: filteredBalance.incomes,
      expense: filteredBalance.expenses,
      incomeTotal: totalBalance.incomes,
      expenseTotal: totalBalance.expenses
    });
  }, [list, filteredList, newCategory]);

  function handleMonthChange(newMonth: string) {
    setCurrentMonth(newMonth);
  }

  function handleAddItem(item: IItem) {
    setList((prevState) => [...prevState, item]);
  }

  return (
    <main
      className='flex h-max flex-col items-center bg-slate-200 bg-gradient-to-t from-white 
              dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 
                md:h-full md:min-h-screen'
    >
      <MainHeader />
      <section className='mt-[27px] flex flex-col items-center lg:min-w-[1024px] xl:min-w-[1180px]'>
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

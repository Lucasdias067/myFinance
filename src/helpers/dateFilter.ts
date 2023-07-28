import { IItem } from '../types/Types';

export function splitDate(date: string) {
  return date.split('-').map(Number);
}

export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export function filterListByMonth(list: IItem[], date: string) {
  const [year, month] = splitDate(date);

  const filteredList = list.filter(
    ({ date }) =>
      new Date(date).getFullYear() === year &&
      new Date(date).getMonth() + 1 === month
  );

  return filteredList;
}

export function formatCurrentMonth(currentMonth: string) {
  const [year, month] = splitDate(currentMonth);

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  return `${months[month - 1]} de ${year}`;
}

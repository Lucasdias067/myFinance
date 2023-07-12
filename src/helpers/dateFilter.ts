import { Item } from '../types/Types';

export function splitDate(date: string) {
  return date.split('-').map(Number);
}

export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export function filterListByMonth(list: Item[], date: string) {
  const [year, month] = splitDate(date);

  const filteredList = list.filter(
    ({ date }) =>
      new Date(date).getFullYear() === year &&
      new Date(date).getMonth() + 1 === month
  );

  return filteredList;
}

export function formatDate(date: Date) {
  const { year, month, day } = {
    year: new Date(date).getFullYear(),
    month: (new Date(date).getMonth() + 1).toString().padStart(2, '0'),
    day: new Date(date).getDate().toString().padStart(2, '0')
  };

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
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

export function newDateAdjusted(dateField: string) {
  const [year, month, day] = splitDate(dateField);
  return new Date(year, month - 1, day);
}

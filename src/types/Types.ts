export interface ICategory {
  [key: string]: {
    title: string;
    color: string;
    expense: boolean;
  };
}

export interface IItem {
  date: Date;
  category: string;
  title: string;
  value: string;
}

export interface IChildrenProps {
  children: React.ReactNode;
}

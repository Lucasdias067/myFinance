export type Category = {
  [key: string]: {
    title: string;
    color: string;
    expense: boolean;
  };
};

export type Item = {
  date: Date;
  category: string;
  title: string;
  value: string;
};

export type childrenProps = {
  children: React.ReactNode;
};

import { IChildrenProps } from '@/types/Types';
import './globals.css';

export const metadata = {
  title: 'Finanças pessoais',
  description: 'Aplicativo de finanças pessoais'
};

export default function RootLayout({ children }: IChildrenProps) {
  return (
    <html lang='pt-BR'>
      <body>{children}</body>
    </html>
  );
}

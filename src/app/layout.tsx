import { childrenProps } from '@/types/Types';
import './globals.css';

export const metadata = {
  title: 'Finanças pessoais',
  description: 'Aplicativo de finanças pessoais'
};

export default function RootLayout({ children }: childrenProps) {
  return (
    <html lang='pt-BR'>
      <body>{children}</body>
    </html>
  );
}

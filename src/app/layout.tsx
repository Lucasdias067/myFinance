'use client';
import { FormProvider } from '@/context/FormContext';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanças pessoais',
  description: 'Aplicativo de finanças pessoais'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <FormProvider>
        <body>{children}</body>
      </FormProvider>
    </html>
  );
}

import './globals.css';

export const metadata = {
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
      <body>{children}</body>
    </html>
  );
}

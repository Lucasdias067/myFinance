import ToggleTheme from '@/app/Toggletheme';

export default function MainHeader() {
  return (
    <section
      className='flex h-48 w-full items-center justify-center bg-slate-900 bg-gradient-to-t 
      from-slate-200 text-center 
              dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-700'
    >
      <h1 className='text-4xl font-bold text-slate-800 dark:text-zinc-100 md:text-5xl'>
        Sistema de Finanças Pessoais
      </h1>
      <ToggleTheme />
    </section>
  );
}

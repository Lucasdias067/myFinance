import Main from '@/components/Main';
import FormProvider from '@/context/FormContext';

export default function Home() {
  return (
    <FormProvider>
      <Main />
    </FormProvider>
  );
}

import { useFormContext } from 'react-hook-form';

interface ReactNode {
  name: string;
}

export function HandleError({ name }: ReactNode) {
  function get(obj: Record<any, any>, path: string) {
    const travel = (regexp: RegExp) =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce(
          (res, key) => (res !== null && res !== undefined ? res[key] : res),
          obj
        );

    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

    return result;
  }

  const {
    formState: { errors }
  } = useFormContext();
  const fieldError = get(errors, name);

  if (!fieldError) return null;

  return (
    <span className='block text-[13px] font-medium text-rose-600 dark:text-red-500 lg:text-sm'>
      {fieldError.message?.toString()}
    </span>
  );
}

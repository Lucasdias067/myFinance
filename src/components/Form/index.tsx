import { MyUseFormContext } from '@/context/FormContext';
import { IItem } from '@/types/Types';
import MainForm from './MainForm';
import RemoveModal from './CategoryModal/RemoveModal';
import AddModal from './CategoryModal/AddModal';

interface IForm {
  onAdd: (item: IItem) => void;
}

export default function Form({ onAdd }: IForm) {
  const { removeCategoryModal, addCategoryModal, closeModal, openModal } =
    MyUseFormContext();

  return (
    <div className='flex w-full justify-center'>
      <MainForm onAdd={onAdd} openModal={openModal} closeModal={closeModal} />
      {addCategoryModal && <AddModal openModal={openModal} />}
      {removeCategoryModal && <RemoveModal closeModal={closeModal} />}
    </div>
  );
}

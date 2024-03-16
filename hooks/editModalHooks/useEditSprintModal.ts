import { create } from 'zustand';

interface EditSprintModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditSprintModal = create<EditSprintModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditSprintModal;
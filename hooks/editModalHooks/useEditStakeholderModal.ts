import { create } from 'zustand';

interface EditStakeholderModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditStakeholderModal = create<EditStakeholderModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditStakeholderModal;
import { create } from 'zustand';

interface EditVersionHistoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditVersionHistoryModal = create<EditVersionHistoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditVersionHistoryModal;
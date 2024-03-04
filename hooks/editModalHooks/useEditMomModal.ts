import { create } from 'zustand';

interface EditMomModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditMomModal = create<EditMomModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditMomModal;
import { create } from 'zustand';

interface EditUpdateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditUpdateModal = create<EditUpdateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditUpdateModal;
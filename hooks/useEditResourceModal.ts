import { create } from 'zustand';

interface EditResourceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditResourceModal = create<EditResourceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditResourceModal;
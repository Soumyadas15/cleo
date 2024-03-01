import { create } from 'zustand';

interface NameModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNameModal = create<NameModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useNameModal;
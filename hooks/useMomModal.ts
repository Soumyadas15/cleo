import { create } from 'zustand';

interface MomModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMomModal = create<MomModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useMomModal;
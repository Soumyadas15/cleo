import { create } from 'zustand';

interface ResourceModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useResourceModal = create<ResourceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useResourceModal;
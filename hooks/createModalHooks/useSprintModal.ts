import { create } from 'zustand';

interface SprintModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSprintModal = create<SprintModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSprintModal;
import { create } from 'zustand';

interface StakeholderModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStakeholderModal = create<StakeholderModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useStakeholderModal;
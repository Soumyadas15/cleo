import { create } from 'zustand';

interface RiskModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRiskModal = create<RiskModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRiskModal;
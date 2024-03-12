import { create } from 'zustand';

interface EscalationMatrixModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEscalationMatrixModal = create<EscalationMatrixModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEscalationMatrixModal;
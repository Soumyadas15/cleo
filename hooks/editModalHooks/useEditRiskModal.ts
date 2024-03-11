import { create } from 'zustand';

interface EditRiskModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditRiskModal = create<EditRiskModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditRiskModal;
import { create } from 'zustand';

interface EditPhaseContentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditPhaseContentModal = create<EditPhaseContentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditPhaseContentModal;
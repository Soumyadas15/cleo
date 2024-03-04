import { create } from 'zustand';

interface PhaseContentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePhaseContentModal = create<PhaseContentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePhaseContentModal;
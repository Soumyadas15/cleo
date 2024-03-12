import { create } from 'zustand';

interface EditEscalationMatrixModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditEscalationMatrixModal = create<EditEscalationMatrixModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditEscalationMatrixModal;
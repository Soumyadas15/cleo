import { create } from 'zustand';

interface EditFeedbackModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditFeedbackModal = create<EditFeedbackModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditFeedbackModal;
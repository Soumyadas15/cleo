import { create } from 'zustand';

interface EditAuditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditAuditModal = create<EditAuditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditAuditModal;
import { create } from 'zustand';

interface DeleteAuditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteAuditModal = create<DeleteAuditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useDeleteAuditModal;
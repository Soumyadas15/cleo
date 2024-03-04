import { create } from 'zustand';

interface AuditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuditModal = create<AuditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useAuditModal;
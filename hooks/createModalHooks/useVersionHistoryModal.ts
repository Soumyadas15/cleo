import { create } from 'zustand';

interface VersionHistoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useVersionHistoryModal = create<VersionHistoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useVersionHistoryModal;
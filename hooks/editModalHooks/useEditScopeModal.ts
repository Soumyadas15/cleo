import { create } from 'zustand';

interface EditScopeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditScopeModal = create<EditScopeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditScopeModal;
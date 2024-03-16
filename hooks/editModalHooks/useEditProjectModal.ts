import { create } from 'zustand';

interface EditProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditProjectModal = create<EditProjectModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditProjectModal;
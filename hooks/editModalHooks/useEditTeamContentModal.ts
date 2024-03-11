import { create } from 'zustand';

interface EditTeamContentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditTeamContentModal = create<EditTeamContentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditTeamContentModal;
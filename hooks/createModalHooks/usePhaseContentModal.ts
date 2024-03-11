import { create } from 'zustand';

interface TeamContentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTeamContentModal = create<TeamContentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useTeamContentModal;
import { create } from 'zustand';

interface EditMilestoneModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditMilestoneModal = create<EditMilestoneModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEditMilestoneModal;
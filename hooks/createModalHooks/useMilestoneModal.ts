import { create } from 'zustand';

interface MilestoneModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMilestoneModal = create<MilestoneModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useMilestoneModal;
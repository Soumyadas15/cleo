import { create } from 'zustand';

interface EmployeesModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEmployeesModal = create<EmployeesModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEmployeesModal;
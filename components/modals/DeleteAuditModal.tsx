"use client"

import { useState, useEffect } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../reusable/Heading";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { format } from "date-fns"
import useDeleteAuditModal from "@/hooks/useDeleteAuditModal";

interface DeleteAuditModalProps {
  audit?: any;
  project?: any;
}

const DeleteAuditModal = ({
  audit,
  project
}: DeleteAuditModalProps) => {

  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const deleteAuditModal = useDeleteAuditModal();
  const [isLoading, setIsLoading] = useState(false);


  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      auditId: audit.id,
    }
  });

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    axios.delete(`/api/audits/${audit.id}`)
        .then(() => {
            toast.success('Deleted audit');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            deleteAuditModal.onClose();
            router.push(`/main/projects/${project.id}/audits`);
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 text-center">
      <div>Are you sure you want to delete this audit?</div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteAuditModal.isOpen}
      title="Delete audit"
      actionLabel="Delete"
      onClose={deleteAuditModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={deleteAuditModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default DeleteAuditModal;

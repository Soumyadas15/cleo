"use client"

import { useState, useEffect } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { motion } from 'framer-motion';
import Modal from "../Modal";
import Heading from "../../reusable/Heading";
import Textarea from "../../reusable/Textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useEditAuditModal from "@/hooks/editModalHooks/useEditAuditModal";
import { Audit } from "@prisma/client";

interface EditAuditModalProps {
  audit: Audit;
  onClose: () => void;
}

const EditAuditModal = ({
  audit,
  onClose
}: EditAuditModalProps) => {


  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const editAuditModal = useEditAuditModal();
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      auditId: audit.id,
      content: audit.body,
    }
  });

  useEffect(() => {
    reset({
      auditId: audit.id,
      content: audit.body,
    });
}, [audit, reset]);

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    axios.put('/api/audits', data)
        .then(() => {
            router.refresh();
            toast.success('Updated audit');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            editAuditModal.onClose();
            onClose();
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Edit audit" subtitle="" center />
      <motion.div
        key="content"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Textarea
          id="content"
          label="Content"
          register={register}
          errors={errors}
          required
        />
      </motion.div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editAuditModal.isOpen}
      title="Project audit"
      actionLabel="Done"
      onClose={editAuditModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={editAuditModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditAuditModal;

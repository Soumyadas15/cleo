'use client';

import { useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { motion } from 'framer-motion';
import Modal from "./Modal";
import Heading from "../reusable/Heading";
import Input from "../reusable/Input";
import useAuditModal from "@/hooks/useAuditModal";
import Textarea from "../reusable/Textarea";

interface AuditModalProps {
  project: any;
  user: any;
}
const AuditModal = ({
  project,
  user,
}: AuditModalProps) => {

  const auditModal = useAuditModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
        errors,
    },
    reset
} = useForm<FieldValues>({
    defaultValues: {
        projectId: project?.id,
        auditedBy: user?.id,
        date: '',
        content: '',
    }
})


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    })
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
  }


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Audit details"
        subtitle=""
        center
      />
        <motion.div
            key="date"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="date"
            label="Date"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
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
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={auditModal.isOpen}
      title="Project audit"
      actionLabel="Done"
      onClose={auditModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={auditModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default AuditModal;
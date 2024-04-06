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
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import Input from "@/components/reusable/Input";
import { Project, User } from "@prisma/client";
import useEscalationMatrixModal from "@/hooks/createModalHooks/useEscalationMatrixModal";
import { mailUpdates } from "@/actions/mailUpdates";

interface EscalationMatrixModalProps {
  project: Project;
  user: User;
}

const EscalationMatrixModal = ({
  project,
  user,
}: EscalationMatrixModalProps) => {


  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const escalationMatrixModal = useEscalationMatrixModal();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const paths = pathname?.split('/').filter(Boolean);
  const matrixType = paths?.pop();


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      projectId: project?.id,
      level: 1,
      name: '',
      type: '',
    }
  });

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    setIsLoading(true);
    data.level = parseInt(data.level, 10);
    data.type = matrixType?.toUpperCase();

    console.log(data)

    axios.post('/api/escalation', data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            reset();
            escalationMatrixModal.onClose();
    })
    await mailUpdates(project.name, project.id)
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Escalation matrix" subtitle="" center />
      <motion.div
        key="level"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
          id="level"
          label="Level"
          register={register}
          errors={errors}
          required
        />
      </motion.div>
      <motion.div
        key="name"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
          id="name"
          label="Name"
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
      isOpen={escalationMatrixModal.isOpen}
      title="Escalation Matrix"
      actionLabel="Done"
      onClose={escalationMatrixModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={escalationMatrixModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EscalationMatrixModal;

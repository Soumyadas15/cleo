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
import Input from "@/components/reusable/Input";
import { Escalation_matrix, Project, User } from "@prisma/client";
import useEditEscalationMatrixModal from "@/hooks/editModalHooks/useEditEscalationMatrixModal";
import { user } from "@nextui-org/react";
import { mailUpdates } from "@/actions/mailUpdates";

interface EditEscalationMatrixModalProps {
  matrix: Escalation_matrix;
  user: User;
  project: Project;
  onClose: () => void;
}

const EditEscalationMatrixModal = ({
  matrix,
  user,
  project,
  onClose
}: EditEscalationMatrixModalProps) => {


  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const editEscalationMatrixModal = useEditEscalationMatrixModal();
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
      userId: user.id,
      matrixId: matrix?.id,
      level: matrix.level,
      name: matrix.name,
      type: matrix.type,
    }
  });

  useEffect(() => {
    reset({
      userId: user.id,
      matrixId: matrix?.id,
      level: matrix.level,
      name: matrix.name,
      type: matrix.type,
    })
  }, [matrix, reset])

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    setIsLoading(true);
    data.level = parseInt(data.level, 10);
    data.type = matrixType?.toUpperCase();

    console.log(data);

    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/escalation/${matrix.id}`, data);
      router.refresh();
      toast.success('Escalation matrix updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/escalation`, data);
            router.refresh();
            toast.success('Escalation matrix updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editEscalationMatrixModal.onClose();
        onClose();
    }
    await mailUpdates(project.name, project.id);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Edit Escalation matrix" subtitle="" center />
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
      isOpen={editEscalationMatrixModal.isOpen}
      title="Escalation Matrix"
      actionLabel="Done"
      onClose={editEscalationMatrixModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={editEscalationMatrixModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditEscalationMatrixModal;

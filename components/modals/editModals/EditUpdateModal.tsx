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
import useEditUpdateModal from "@/hooks/editModalHooks/useEditUpdateModa";
import { Project, Update, User } from "@prisma/client";
import DateInput from "@/components/reusable/DateInput";
import { user } from "@nextui-org/react";
import { mailUpdates } from "@/actions/mailUpdates";

interface EditUpdateModalProps {
  update: Update;
  user: User;
  project: Project;
  onClose: () => void;
}

const EditUpdateModal = ({
  update,
  user,
  project,
  onClose
}: EditUpdateModalProps) => {


  const [date, setDate] = useState<Date>(update.date);
  const router = useRouter();
  const editUpdateModal = useEditUpdateModal();
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      userId: user.id,
      updateId: update?.id,
      date: update.date,
      body: update.body,
    }
  });

  useEffect(() => {
    reset({
      userId: user.id,
      updateId: update?.id,
      date: update.date,
      body: update.body,
    });
}, [update, reset]);

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/updates/${update.id}`, data);
      router.refresh();
      toast.success('Update updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/updates`, data);
            router.refresh();
            toast.success('Update updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editUpdateModal.onClose();
        onClose();
    }
    await mailUpdates(project.name, project.id)
  };
  

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Edit update" subtitle="" center />
      <motion.div
        key="date"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <DateInput
          label="Date"
          selectedDate={date}
          onSelect={setDate}
        />
      </motion.div>
      <motion.div
        key="body"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Textarea
          id="body"
          label="Details"
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
      isOpen={editUpdateModal.isOpen}
      title="Edit update"
      actionLabel="Done"
      onClose={editUpdateModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={editUpdateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditUpdateModal;

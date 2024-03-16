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
import { Update } from "@prisma/client";
import DateInput from "@/components/reusable/DateInput";

interface EditUpdateModalProps {
  update: Update;
  onClose: () => void;
}

const EditUpdateModal = ({
  update,
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
      updateId: update?.id,
      date: update.date,
      body: update.body,
    }
  });

  useEffect(() => {
    reset({
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
    axios.put('/api/updates', data)
        .then(() => {
            router.refresh();
            toast.success('Update edited successfully');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            editUpdateModal.onClose();
            onClose()
    })
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

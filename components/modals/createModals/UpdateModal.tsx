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
import useUpdateModal from "@/hooks/createModalHooks/useUpdateModal";
import DateInput from "@/components/reusable/DateInput";
import { mailUpdates } from "@/actions/mailUpdates";

interface UpdateModalProps {
  project: any;
  user: any;
}

const UpdateModal = ({
  project,
  user,
}: UpdateModalProps) => {


  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const updateModal = useUpdateModal();
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
      projectId: project?.id,
      date: undefined,
      body: '',
    }
  });

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);




  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.post(`${backendServer}/updates`, data);
        router.refresh();
        toast.success('Success');
    } catch (firstError) {
        try {
            await axios.post(`/api/updates`, data);;
            router.refresh();
            toast.success('Success (using backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        updateModal.onClose();
    }
    await mailUpdates(project.name, project.id);
  };




  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add an update" subtitle="" center />
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
      isOpen={updateModal.isOpen}
      title="Project update"
      actionLabel="Done"
      onClose={updateModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={updateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default UpdateModal;

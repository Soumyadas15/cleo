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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/reusable/Input";
import { Stakeholder, User } from "@prisma/client";
import useEditStakeholderModal from "@/hooks/editModalHooks/useEditStakeholderModal";

interface EditStakeholderModalProps {
    stakeholder: Stakeholder;
    user: User;
    onClose: () => void;
}

const EditStakeholderModal = ({
    stakeholder,
    user,
    onClose
}: EditStakeholderModalProps) => {


  const router = useRouter();
  const editStakeholderModal = useEditStakeholderModal();
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
      stakeholderId: stakeholder.id,
      title: stakeholder.title,
      name: stakeholder.name,
      contact: stakeholder.contact
    }
  });

  useEffect(() => {
    reset({
        userId: user.id,
        stakeholderId: stakeholder.id,
        title: stakeholder.title,
        name: stakeholder.name,
        contact: stakeholder.contact
    });
}, [stakeholder, reset]);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/stakeholders/${stakeholder.id}`, data);
      router.refresh();
      toast.success('Stakeholder updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/stakeholders`, data);
            router.refresh();
            toast.success('Stakeholder updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editStakeholderModal.onClose();
        onClose();
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Edit stakeholder" subtitle="" center />
      <motion.div
        key="title"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
          id="title"
          label="Title"
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

      <motion.div
        key="contact"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
          id="contact"
          label="Contact"
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
      isOpen={editStakeholderModal.isOpen}
      title="Stakeholders"
      actionLabel="Done"
      onClose={editStakeholderModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={editStakeholderModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditStakeholderModal;

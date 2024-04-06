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
import useStakeholderModal from "@/hooks/createModalHooks/useStakeholderModal";
import Input from "@/components/reusable/Input";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import { User } from "@prisma/client";
import { mailUpdates } from "@/actions/mailUpdates";

interface StakeholderModalProps {
  project: any;
  user: User;
}

const StakeholderModal = ({
  project,
  user,
}: StakeholderModalProps) => {


  const router = useRouter();
  const stakeholderModal = useStakeholderModal();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("CLIENT");


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      sub: user.userId,
      userId: user.id,
      projectId: project?.id,
      title: role,
      name: '',
      contact: ''
    }
  });





  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    // try {
    //     await axios.post(`${backendServer}/stakeholders`, data);
    //     router.refresh();
    //     toast.success('Success');
    // } catch (firstError) {
    //     try {
    //         await axios.post(`/api/stakeholders`, data);;
    //         router.refresh();
    //         toast.success('Success (backup)');
    //     } catch (secondError : any) {
    //         const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
    //         toast.error(errorMessage);
    //     }
    // } finally {
    //     setIsLoading(false);
    //     stakeholderModal.onClose();
    // }
    axios.post('/api/stakeholders', data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            stakeholderModal.onClose()
    })
    await mailUpdates(project.name, project.id)
  };

  const handleRoleSelect = (value: any) => {
    setRole(value);
    setValue('title', value);
  }




  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add stakeholder" subtitle="" center />
      <motion.div
        key="title"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
         <DropdownInput
            label={role}
            menuItems={['CLIENT', 'MANAGER', 'AUDITOR']}
            onSelect={handleRoleSelect}
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
          type="email"
        />
      </motion.div>

    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={stakeholderModal.isOpen}
      title="Stakeholders"
      actionLabel="Done"
      onClose={stakeholderModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={stakeholderModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default StakeholderModal;

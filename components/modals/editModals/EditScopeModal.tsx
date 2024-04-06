'use client';

import { useEffect, useMemo, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import Modal from "../Modal";
import Heading from "../../reusable/Heading";
import axios from 'axios';
import toast from "react-hot-toast";
import Textarea from "@/components/reusable/Textarea";
import useEditScopeModal from "@/hooks/editModalHooks/useEditScopeModal";
import { Project } from "@prisma/client";
import { mailUpdates } from "@/actions/mailUpdates";

interface EditScopeModalProps {
    project: Project;
}
const EditScopeModal = ({
    project,
}: EditScopeModalProps) => {

  const router = useRouter();
  const editScopeModal = useEditScopeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      projectId: project.id,
      type: project.type,
      name: project.name,
      description: project.description,
      scope: project.scope,
      duration: project.duration,
      budgetedHours: project.budgetedHours,
      projectType: project.projectType,
    }
  });


  useEffect(() => {
    reset({
        projectId: project.id,
        type: project.type,
        name: project.name,
        description: project.description,
        scope: project.scope,
        duration: project.duration,
        budgetedHours: project.budgetedHours,
        projectType: project.projectType,
    });
  }, [project, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    console.log(data);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/projects/${project.id}`, data);
      router.refresh();
      toast.success('Scope updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/projects`, data);
            router.refresh();
            toast.success('Scope updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editScopeModal.onClose();
    }
    await mailUpdates(project.name, project.id);
  }

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Project scope"
        subtitle=""
        center
      />
      <motion.div
        key="scope"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Textarea
            id="scope"
            label="Scope"
            disabled={isLoading}
            register={register}  
            errors={errors}
            height="h-[10rem]"
            required
        />
      </motion.div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editScopeModal.isOpen}
      title="Edit scope"
      actionLabel="Update"
      onClose={editScopeModal.onClose}
      secondaryActionLabel={"Cancel"}
      secondaryAction={editScopeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default EditScopeModal;
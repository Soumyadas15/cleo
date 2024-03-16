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
import Input from "../../reusable/Input";
import axios from 'axios';
import toast from "react-hot-toast";
import useSuccessModal from "@/hooks/useSuccessModal";
import useCreateModal from "@/hooks/useLoginModal";
import { useModal } from "@/hooks/useModalStore";
import { ProgressBar } from "../../ProgressBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/reusable/Textarea";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import { Project } from "@prisma/client";
import useEditProjectModal from "@/hooks/editModalHooks/useEditProjectModal";

enum STEPS {
  NAME = 0,
  DESCRIPTION = 1,
  SCOPE = 2,
  TIME = 3,
}

interface EditProjectModalProps {
  project: Project;
}
const EditProjectModal = ({
  project,
}: EditProjectModalProps) => {

  const router = useRouter();
  const editProjectModal = useEditProjectModal();
  const [step, setStep] = useState(STEPS.NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(project.type);

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
        projectId: project.id,
        type: project.type,
        name: project.name,
        description: project.description,
        scope: project.scope,
        duration: project.duration,
        budgetedHours: project.budgetedHours,
        projectType: project.projectType,
    }
})

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


  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.TIME){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.put('/api/projects', data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.TIME){
        return 'Update'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.NAME){
          return undefined;
      }
      return 'Back'
  }, [step]);


  const handleTypeSelect = (type : any) => {
    setType(type);
    setValue('type', type);
  }


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Project name"
        subtitle=""
        center
      />
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
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        <motion.div
            key="type"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DropdownInput
            label={type}
            menuItems={["Fixed budget", "monthly"]}
            onSelect={handleTypeSelect}
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project description"
          subtitle=""
          center
        />
          <motion.div
              key="description"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Textarea
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
              minLength={100}
            />
          </motion.div>
      </div>
    )
  }

  if (step === STEPS.SCOPE){
    bodyContent = (
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
              required
            />
          </motion.div>
      </div>
    )
  }

  if (step === STEPS.TIME){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project scope"
          subtitle=""
          center
        />
          <motion.div
              key="duration"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Input
              id="duration"
              label="Duration (in months)"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
          </motion.div>

          <motion.div
              key="budgetedHours"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Input
              id="budgetedHours"
              label="Budgeted hours"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
          </motion.div>
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={editProjectModal.isOpen}
      title="Edit project"
      actionLabel={actionLabel}
      onClose={editProjectModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.NAME ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[90%] dark:bg-neutral-800 bg-gray-200 h-[2px] rounded-full">
            <ProgressBar currentStep={step} totalSteps={Object.keys(STEPS).length / 2} />
          </div>
          <div className="w-full">
            {bodyContent}
          </div>
        </div>
      }
    />
  );
}

export default EditProjectModal;
'use client';

import { useCallback, useMemo, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import { motion } from 'framer-motion';
import Modal from "./Modal";
import Heading from "../reusable/Heading";
import Input from "../reusable/Input";
import axios from 'axios';
import toast from "react-hot-toast";

enum STEPS {
  DESCRIPTION = 0,
  CLIENTS = 1,
  MANAGER = 2,
}

interface CreateModalProps {
  user: any;
}
const CreateModal = ({
  user,
}: CreateModalProps) => {

  const router = useRouter();
  const loginModal = useLoginModal();
  const [currentStage, setCurrentStage] = useState(1);
  const [step, setStep] = useState(STEPS.DESCRIPTION);
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
        createdBy: user?.id,
        name: '',
        clients: '',
        manager: '',
    }
})


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    })
  }

  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.MANAGER){
      return onNext();
    }
    console.log(data);
    axios.post('/api/projects', data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.MANAGER){
        return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DESCRIPTION){
          return undefined;
      }
      return 'Back'
  }, [step]);

  const renderStageNumber = (stage: number) => {
    const isActive = step === stage;
    return (
      <motion.div
        key={stage}
        className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${
          isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
        whileHover={{ scale: 1.2 }}
      >
        {stage + 1}
      </motion.div>
    );
  };

  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100; // Adjust for enum length
  }, [step]);

  const variants = {
    hidden: { opacity: 0, x: "-50%" },
    visible: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "100%" },
  };



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Project name"
        subtitle=""
        center
      />
        <motion.div
            key="manager"
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
    </div>
  )

  if (step === STEPS.CLIENTS){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add clients"
          subtitle=""
          center
        />
        <motion.div
            key="clients"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="clients"
            label="Clients"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.MANAGER){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project manager"
          subtitle=""
          center
        />
        <motion.div
            key="manager"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="manager"
            label="Project manager"
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
      isOpen={loginModal.isOpen}
      title="New project"
      actionLabel={actionLabel}
      onClose={loginModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-6">
          <div className="w-full dark:bg-neutral-800 bg-gray-200 h-[2px] rounded-full">
            <motion.div
              className="bg-blue-500 h-[2px] rounded-full"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          {bodyContent}
        </div>
      }
    />
  );
}

export default CreateModal;
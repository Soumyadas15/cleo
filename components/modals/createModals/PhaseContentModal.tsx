'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
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
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import Textarea from "../../reusable/Textarea";
import { ProgressBar } from "../../ProgressBar";
import usePhaseContentModal from "@/hooks/createModalHooks/usePhaseContentModal";

enum STEPS {
  RESOURCES = 0,
  ROLE = 1,
  AVAILABILITY = 2,
  DURATION = 3,
}

interface PhaseContentModalProps {
  user: any;
  phase: any
}
const PhaseContentModal = ({
  user,
  phase
}: PhaseContentModalProps) => {

  const router = useRouter();
  const phaseContentModal = usePhaseContentModal();
  const [step, setStep] = useState(STEPS.RESOURCES);

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
            phaseId: phase.id,
            resources: '',
            role: '',
            availability: '',
            duration: '',
    }})


  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.DURATION){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.post('/api/phases/phase-content', data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            phaseContentModal.onClose()
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.DURATION){
        return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.RESOURCES){
          return undefined;
      }
      return 'Back'
  }, [step]);


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Number of resources"
        subtitle=""
        center
      />
        <motion.div
            key="resources"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="resources"
            label="Number of resources"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.ROLE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Role"
          subtitle=""
          center
        />
        <motion.div
            key="Role"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="role"
            label="Role"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.AVAILABILITY){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Availability"
          subtitle=""
          center
        />
        <motion.div
            key="availability"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="availability"
            label="Availability (in percentage)"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
      </div>
    )
  }

    if (step === STEPS.DURATION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Duration"
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
      </div>
    )
  }



  return (
    <Modal
      disabled={isLoading}
      isOpen={phaseContentModal.isOpen}
      title="Phase details"
      actionLabel={actionLabel}
      onClose={phaseContentModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.RESOURCES ? undefined : onBack}
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

export default PhaseContentModal;
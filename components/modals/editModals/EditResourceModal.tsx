"use client"


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
import Textarea from "../../reusable/Textarea";
import useEditResourceModal from "@/hooks/editModalHooks/useEditResourceModal";
import { ProgressBar } from "../../ProgressBar";
import { Project, User } from "@prisma/client";
import DateInput from "@/components/reusable/DateInput";
import axios from "axios";
import toast from "react-hot-toast";

interface EditResourceModalProps {
  project: Project;
  resource?: any;
  user: User;
  onClose: () => void;
}

enum STEPS {
  DESCRIPTION = 0,
  ROLE = 1,
  COMMENT = 2,
  DATES = 3,
}

const EditResourceModal = ({
  resource,
  user,
  onClose,
  project,
}: EditResourceModalProps) => {


  const router = useRouter();
  const editResourceModal = useEditResourceModal();
  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [showDateError, setShowDateError] = useState(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
            userId: user.id,
            resourceId: resource.id,
            name: resource.name,
            assignability: resource.assignability,
            role: resource.role,
            comment: resource.comment,
            startDate: resource.startDate,
            endDate: resource.endDate,
    }})

  useEffect(() => {
      reset({
        userId: user.id,
        resourceId: resource.id,
        name: resource.name,
        assignability: resource.assignability,
        role: resource.role,
        comment: resource.comment,
        startDate: resource.startDate,
        endDate: resource.endDate,
      });
  }, [resource, reset]);


  useEffect(() => {
      if (resource.startDate) {
        const resourceStartDate = new Date(resource.startDate);
        setStartDate(resourceStartDate);
        setValue("startDate", resourceStartDate);
      }
  }, [resource.startDate, setValue]);

  useEffect(() => {
      if (resource.endDate) {
        const feedbackEndDate = new Date(resource.endDate);
        setEndDate(feedbackEndDate);
        setValue("endDate", feedbackEndDate);
      }
  }, [resource.endDate, setValue]);

  const handleStartDateSelect = (value : any) => {
    setStartDate(value);
    setValue("startDate", value);
  }

  const handleEndDateSelect = (value : any) => {
    if (endDate! < startDate!){
      setShowDateError(true);
    }
    else{
      setShowDateError(false);
      setEndDate(value);
      setValue("endDate", value);
    }
    
  }




  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.DATES){
      return onNext();
    }
    data.assignability = parseInt(data.assignability);
    console.log(data)
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/resources/${resource.id}`, data);
      router.refresh();
      toast.success('Resource updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/resources`, data);
            router.refresh();
            toast.success('Resource updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editResourceModal.onClose();
        onClose();
    }
  }
  

  const actionLabel = useMemo(() => {
    if(step === STEPS.DATES){
        return 'Update'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DESCRIPTION){
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
        title="Details"
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
            key="assignability"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="assignability"
            label="Assignability"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
            type="number"
          />
        </motion.div>

    </div>
  )

  if (step === STEPS.ROLE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add role"
          subtitle=""
          center
        />
        <motion.div
            key="role"
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

  if (step === STEPS.COMMENT){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Comment"
          subtitle=""
          center
        />
        <motion.div
            key="comment"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Textarea
            id="comment"
            label="Comment"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
      </div>
    )
  }

    if (step === STEPS.DATES){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Dates"
          subtitle=""
          center
        />
        <motion.div
            key="startDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <DateInput
              label="Start date"
              selectedDate={startDate}
              onSelect={handleStartDateSelect}
            />
        </motion.div>
        <motion.div
            key="endDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <DateInput
              label="End date"
              selectedDate={endDate}
              onSelect={handleEndDateSelect}
            />
            {showDateError ? <span className='text-red-600 text-sm font-semibold'>Feedback date should not exceed current date</span> : <span></span>}
        </motion.div>
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading || showDateError}
      isOpen={editResourceModal.isOpen}
      title="Edit resource"
      actionLabel={actionLabel}
      onClose={editResourceModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
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
};

export default EditResourceModal;

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
import { ProgressBar } from "../../ProgressBar";
import Textarea from "@/components/reusable/Textarea";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import DateInput from "@/components/reusable/DateInput";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import useSprintModal from "@/hooks/createModalHooks/useSprintModal";
import { Sprint } from "@prisma/client";
import useEditSprintModal from "@/hooks/editModalHooks/useEditSprintModal";

enum STEPS {
  DATES = 0,
  STATUS = 1,
  COMMENTS = 2,
}

interface EditSprintModalProps {
  sprint: Sprint;
  onClose: () => void;
}
const EditSprintModal = ({
  sprint,
  onClose
}: EditSprintModalProps) => {

  const router = useRouter();
  const editSprintModal = useEditSprintModal();
  const [step, setStep] = useState(STEPS.DATES);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(sprint.startDate);
  const [endDate, setEndDate] = useState<Date>(sprint.endDate);
  const [status, setStatus] = useState(sprint.status);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      sprintId: sprint?.id,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
      comments: sprint.comments,
    }
  });
  useEffect(() => {
    reset({
        sprintId: sprint?.id,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        status: sprint.status,
        comments: sprint.comments,
    });
  }, [sprint, reset]);

  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.COMMENTS){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.put('/api/sprints', data)
        .then(() => {
            router.refresh();
            toast.success('Success!');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            editSprintModal.onClose();
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.COMMENTS){
        return 'Update'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DATES){
          return undefined;
      }
      return 'Back'
  }, [step]);

  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
  }, [startDate, setValue]);


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);

    const handleStatusSelect = (status : any) => {
        setStatus(status);
        setValue('status', status);
    }


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Date"
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
            onSelect={setStartDate}
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
            onSelect={setEndDate}
        />
      </motion.div>

    </div>
  )

  if (step === STEPS.STATUS){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Status"
          subtitle=""
          center
        />
          <motion.div
              key="status"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DropdownInput
                label={status}
                menuItems={["Delayed", "On-time", "Sign-off Pending", "Signed-off"]}
                onSelect={handleStatusSelect}
            />
          </motion.div>
      </div>
    )
  }

  if (step === STEPS.COMMENTS){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Comments"
          subtitle=""
          center
        />
          <motion.div
              key="comments"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Textarea
              id="comments"
              label="Comments"
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
      isOpen={editSprintModal.isOpen}
      title="Edit sprint"
      actionLabel={actionLabel}
      onClose={editSprintModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DATES ? undefined : onBack}
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

export default EditSprintModal;
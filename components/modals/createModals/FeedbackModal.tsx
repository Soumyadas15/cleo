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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "../../ui/calendar";
import useFeedbackModal from "@/hooks/createModalHooks/useFeedbackModal";
import { ProgressBar } from "../../ProgressBar";
import DateInput from "@/components/reusable/DateInput";

enum STEPS {
  TYPE = 0,
  BODY = 1,
  ACTION = 2,
  DATES = 3,
}

interface FeedbackModalProps {
  user: any;
  project: any
}
const FeedbackModal = ({
  user,
  project
}: FeedbackModalProps) => {

  const router = useRouter();
  const feedbackModal = useFeedbackModal();
  const [step, setStep] = useState(STEPS.TYPE);

  const [date, setDate] = useState<Date>();
  const [closureDate, setClosureDate] = useState<Date>();

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
            projectId: project.id,
            type: '',
            body: '',
            action: '',
            date: undefined,
            endDate: undefined,
    }})

    useEffect(() => {
        if (date) {
        setValue("date", date);
        }
    }, [date, setValue]);

    useEffect(() => {
        if (closureDate) {
        setValue("closureDate", closureDate);
        }
    }, [closureDate, setValue]);


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
    setIsLoading(true)
    console.log(data);
    axios.post('/api/feedbacks', data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            feedbackModal.onClose()
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.DATES){
        return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.TYPE){
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
        title="Feedback type"
        subtitle=""
        center
      />
        <motion.div
            key="type"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="type"
            label="Feedback type"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.BODY){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Body"
          subtitle=""
          center
        />
        <motion.div
            key="body"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Textarea
            id="body"
            label="Detailed feedback"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.ACTION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Action"
          subtitle=""
          center
        />
        <motion.div
            key="action"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Textarea
            id="action"
            label="Action taken"
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
            key="date"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <DateInput
              label="Start Date"
              selectedDate={date}
              onSelect={setDate}
            />
        </motion.div>
        <motion.div
            key="closureDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <DateInput
              label="Closure Date"
              selectedDate={closureDate}
              onSelect={setClosureDate}
            />
        </motion.div>
      </div>
    )
  }



  return (
    <Modal
      disabled={isLoading}
      isOpen={feedbackModal.isOpen}
      title="Client feedback"
      actionLabel={actionLabel}
      onClose={feedbackModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.TYPE ? undefined : onBack}
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

export default FeedbackModal;
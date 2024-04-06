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
import Textarea from "../../reusable/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "../../ui/calendar";
import useEditFeedbackModal from "@/hooks/editModalHooks/useEditFeedbackModal";
import { ProgressBar } from "../../ProgressBar";
import { Feedback, Project, User } from "@prisma/client";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import DateInput from "@/components/reusable/DateInput";
import { mailUpdates } from "@/actions/mailUpdates";

enum STEPS {
  TYPE = 0,
  BODY = 1,
  ACTION = 2,
  DATES = 3,
}

interface EditFeedbackModalProps {
  feedback: Feedback;
  user: User;
  project: Project;
  onClose: () => void;
}
const EditFeedbackModal = ({
  feedback,
  user,
  project,
  onClose
}: EditFeedbackModalProps) => {

  const currentDate = new Date();

  const router = useRouter();
  const editFeedbackModal = useEditFeedbackModal();
  const [step, setStep] = useState(STEPS.TYPE);
  const [feedbackType, setFeedbackType] = useState(feedback.type);
  const [showDateError, setShowDateError] = useState(false);

  const [date, setDate] = useState<Date>(feedback.date);
  const [closureDate, setClosureDate] = useState<Date>(feedback.closureDate);

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
            feedbackId: feedback.id,
            type: feedback.type,
            body: feedback.body,
            action: feedback.action,
            date: feedback.date,
            closureDate: feedback.closureDate,
    }})

  useEffect(() => {
      reset({
        userId: user.id,
        feedbackId: feedback.id,
        type: feedback.type,
        body: feedback.body,
        action: feedback.action,
        date: feedback.date,
        closureDate: feedback.closureDate,
      });
  }, [feedback, reset]);

  useEffect(() => {
    if (date! > currentDate) {
      setShowDateError(true);
    }
    else {
      setShowDateError(false);
      setValue("date", date);
    }
}, [date, setValue]);

  useEffect(() => {
      if (feedback.closureDate) {
        const feedbackClosureDate = new Date(feedback.closureDate);
        setClosureDate(feedbackClosureDate);
        setValue("closureDate", feedbackClosureDate);
      }
  }, [feedback.closureDate, setValue]);


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
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.put(`${backendServer}/feedbacks/${feedback.id}`, data);
      router.refresh();
      toast.success('Feedback updated');
    } catch (firstError) {
        try {
            await axios.put(`/api/feedbacks`, data);
            router.refresh();
            toast.success('Feedback updated (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editFeedbackModal.onClose();
        onClose();
    }
    await mailUpdates(project.name, project.id);
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.DATES){
        return 'Update'
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

  const handleFeedbackTypeChange = (value : string) => {
    setFeedbackType(value);
    setValue('type', value);
  }



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
          <DropdownInput
            label={feedbackType}
            menuItems={["Complaint", "Appreciation", "Suggestion"]}
            onSelect={handleFeedbackTypeChange}
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.BODY){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Detailed feedback"
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
              label="Fedback Date"
              selectedDate={date}
              onSelect={setDate}
            />
            {showDateError ? <span className='text-red-600 text-sm font-semibold'>Feedback date should not exceed current date</span> : <span></span>}
        </motion.div>
        <motion.div
            key="closureDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full border-[1px] border-neutral-300 rounded-[5px] justify-start text-left font-normal",
                    !closureDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {closureDate ? format(closureDate, "PPP") : <span>End date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={closureDate}
                onSelect={(date) => {
                    setClosureDate(date!);
                    setValue("closureDate", date);
                }}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
      </div>
    )
  }



  return (
    <Modal
      disabled={isLoading || showDateError}
      isOpen={editFeedbackModal.isOpen}
      title="Edit feedback"
      actionLabel={actionLabel}
      onClose={editFeedbackModal.onClose}
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

export default EditFeedbackModal;
'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import Modal from "./Modal";
import Heading from "../reusable/Heading";
import Input from "../reusable/Input";
import axios from 'axios';
import toast from "react-hot-toast";
import useResourceModal from "@/hooks/useResourceModal";
import Textarea from "../reusable/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "../ui/calendar";
import useFeedbackModal from "@/hooks/useFeedbackModal";
import useMomModal from "@/hooks/useMomModal";
import { ProgressBar } from "../ProgressBar";

enum STEPS {
  DURATION = 0,
  DATE = 1,
  LINK = 2,
  COMMENTS = 3,
}

interface MomModalProps {
  user: any;
  project: any
}
const MomModal = ({
  user,
  project
}: MomModalProps) => {

  const router = useRouter();
  const momModal = useMomModal();
  const [step, setStep] = useState(STEPS.DURATION);

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
            duration: '',
            date: undefined,
            link: '',
            comments: '',
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
    if (step !== STEPS.COMMENTS){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.post('/api/moms', data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            momModal.onClose()
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.COMMENTS){
        return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DURATION){
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
        title="Duration"
        subtitle=""
        center
      />
        <Input
            id="duration"
            label="Duration in minutes"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
        />
    </div>
  )

  if (step === STEPS.DATE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Date"
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
          <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full border-[1px] border-neutral-300 rounded-[5px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.LINK){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Link"
          subtitle=""
          center
        />
        <motion.div
            key="link"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="link"
            label="MoM link"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
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
      isOpen={momModal.isOpen}
      title="Meeting Minutes"
      actionLabel={actionLabel}
      onClose={momModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DURATION ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-6">
          <div className="w-full dark:bg-neutral-800 bg-gray-200 h-[2px] rounded-full">
            <ProgressBar currentStep={step} totalSteps={Object.keys(STEPS).length / 2} />
          </div>
          {bodyContent}
        </div>
      }
    />
  );
}

export default MomModal;
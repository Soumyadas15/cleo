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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/reusable/Textarea";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import useVersionHistoryModal from "@/hooks/createModalHooks/useVersionHistoryModal";

enum STEPS {
  TYPE = 0,
  REASON = 1,
  DATES = 2,
  PEOPLE = 3,
}

interface VersionHistoryModalProps {
  user: any;
  project: any;
}
const VersionHistoryModal = ({
  user,
  project,
}: VersionHistoryModalProps) => {

  const router = useRouter();
  const versionHistoryModal = useVersionHistoryModal();
  const [step, setStep] = useState(STEPS.TYPE);
  const [isLoading, setIsLoading] = useState(false);
  const [revisionDate, setRevisionDate] = useState<Date>();
  const [approvalDate, setApprovalDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      projectId: project?.id,
      version: '',
      type: '',
      change: '',
      changeReason: '',
      revisionDate: undefined,
      approvalDate: undefined,
      approvedBy: '',
      createdBy: '',
    }
  });

  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PEOPLE){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.post('/api/versions', data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            versionHistoryModal.onClose();
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.PEOPLE){
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

  useEffect(() => {
    if (revisionDate) {
      setValue("revisionDate", revisionDate);
    }
  }, [revisionDate, setValue]);

  useEffect(() => {
    if (approvalDate) {
      setValue("approvalDate", approvalDate);
    }
  }, [approvalDate, setValue]);


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Version and type"
        subtitle=""
        center
      />
      <motion.div
        key="version"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
            id="version"
            label="Version"
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
        <Input
            id="type"
            label="Type"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
        />
      </motion.div>
      <motion.div
        key="change"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
            id="change"
            label="Change"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
        />
      </motion.div>
    </div>
  )

  if (step === STEPS.REASON){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Reason"
          subtitle=""
          center
        />
          <motion.div
              key="changeReason"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Textarea
              id="changeReason"
              label="Change reason"
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
            key="revisionDate"
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
                    !revisionDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {revisionDate ? format(revisionDate, "PPP") : <span>Revision date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={revisionDate}
                onSelect={setRevisionDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
        <motion.div
            key="approvalDate"
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
                    !approvalDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {approvalDate ? format(approvalDate, "PPP") : <span>Change Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={approvalDate}
                onSelect={setApprovalDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
      </div>
    )
  }

  if (step === STEPS.PEOPLE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="People"
          subtitle=""
          center
        />
        <motion.div
            key="createdBy"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <Input
              id="createdBy"
              label="Created by"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
        </motion.div>
        <motion.div
            key="approvedBy"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <Input
              id="approvedBy"
              label="Approved by"
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
      isOpen={versionHistoryModal.isOpen}
      title="Version history"
      actionLabel={actionLabel}
      onClose={versionHistoryModal.onClose}
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

export default VersionHistoryModal;
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
import DateInput from "@/components/reusable/DateInput";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown";
import useMilestoneModal from "@/hooks/createModalHooks/useMilestoneModal";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import { mailUpdates } from "@/actions/mailUpdates";

enum STEPS {
  PHASE = 0,
  DATES = 1,
  STATUS = 2,
  COMMENTS = 3,
}

interface MilestoneModalProps {
  user: any;
  project: any;
}
const MilestoneModal = ({
  user,
  project,
}: MilestoneModalProps) => {

  const router = useRouter();
  const milestoneModal = useMilestoneModal();
  const [step, setStep] = useState(STEPS.PHASE);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [approvalDate, setApprovalDate] = useState<Date>();
  const [revisedCompletionDate, setRevisedCompletionDate] = useState<Date>();
  const [status, setStatus] = useState("Status");


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      userId: user.id,
      projectId: project?.id,
      phase: '',
      startDate: undefined,
      completionDate: undefined,
      approvalDate: undefined,
      status: '',
      revisedCompletionDate: undefined,
      comments: '',
    }
  });

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
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.post(`${backendServer}/milestones`, data);
        router.refresh();
        toast.success('Success');
    } catch (firstError) {
        try {
            await axios.post(`/api/milestones`, data);;
            router.refresh();
            toast.success('Success (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        milestoneModal.onClose();
    }
    await mailUpdates(project.name, project.id)
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.COMMENTS){
        return 'Create'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.PHASE){
          return undefined;
      }
      return 'Back'
  }, [step]);





  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
  }, [startDate, setValue]);

  useEffect(() => {
    if (completionDate) {
      setValue("completionDate", completionDate);
    }
  }, [completionDate, setValue]);

  useEffect(() => {
    if (approvalDate) {
      setValue("approvalDate", approvalDate);
    }
  }, [approvalDate, setValue]);

  useEffect(() => {
    if (revisedCompletionDate) {
      setValue("revisedCompletionDate", revisedCompletionDate);
    }
  }, [revisedCompletionDate, setValue]);

  const handleStatusSelect = (value: any) => {
    setStatus(value);
    setValue('status', value);
  }
  

  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Phase"
        subtitle=""
        center
      />
      <motion.div
        key="phase"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Input
          id="phase"
          label="Phase"
          disabled={isLoading}
          register={register}  
          errors={errors}
          required
        />
      </motion.div>
    </div>
  )

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
            label="Start Date"
            selectedDate={startDate}
            onSelect={setStartDate}
          />
        </motion.div>
        <motion.div
          key="completionDate"
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DateInput
            label="Completion Date"
            selectedDate={completionDate}
            onSelect={setCompletionDate}
          />
        </motion.div>
        <motion.div
          key="approvalDate"
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DateInput
            label="Approval Date"
            selectedDate={approvalDate}
            onSelect={setApprovalDate}
          />
        </motion.div>
      </div>
    )
  }

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
              menuItems={['Delayed', 'On-time', 'Pending']}
              onSelect={handleStatusSelect}
            />
          </motion.div>      
          <motion.div
              key="revisedCompletionDate"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DateInput
              label="Revised completion Date"
              selectedDate={revisedCompletionDate}
              onSelect={setRevisedCompletionDate}
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
      isOpen={milestoneModal.isOpen}
      title="Milestone"
      actionLabel={actionLabel}
      onClose={milestoneModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.PHASE ? undefined : onBack}
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

export default MilestoneModal;
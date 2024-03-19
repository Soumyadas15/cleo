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
import DateInput from "@/components/reusable/DateInput";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import { Milestone, User } from "@prisma/client";
import useEditMilestoneModal from "@/hooks/editModalHooks/useMilestoneModal";

enum STEPS {
  PHASE = 0,
  DATES = 1,
  STATUS = 2,
  COMMENTS = 3,
}

interface EditMilestoneModalProps {
    milestone: Milestone;
    user: User;
    onClose: () => void;
}
const EditMilestoneModal = ({
    milestone,
    user,
    onClose
}: EditMilestoneModalProps) => {

  const router = useRouter();
  const editMilestoneModal = useEditMilestoneModal();
  const [step, setStep] = useState(STEPS.PHASE);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(milestone.startDate);
  const [completionDate, setCompletionDate] = useState<Date>(milestone.completionDate);
  const [approvalDate, setApprovalDate] = useState<Date>(milestone.approvalDate);
  const [revisedCompletionDate, setRevisedCompletionDate] = useState<Date>(milestone.revisedCompletionDate);
  const [status, setStatus] = useState(milestone.status);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      userId: user.id,
      milestoneId: milestone?.id,
      phase: milestone.phase,
      startDate: milestone.startDate,
      completionDate: milestone.completionDate,
      approvalDate: milestone.approvalDate,
      status: milestone.status,
      revisedCompletionDate: milestone.revisedCompletionDate,
      comments: milestone.comments,
    }
  });

    useEffect(() => {
        reset({
            userId: user.id,
            milestoneId: milestone?.id,
            phase: milestone.phase,
            startDate: milestone.startDate,
            completionDate: milestone.completionDate,
            approvalDate: milestone.approvalDate,
            status: milestone.status,
            revisedCompletionDate: milestone.revisedCompletionDate,
            comments: milestone.comments,
        });
    }, [milestone, reset]);


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
    axios.put(`${process.env.BACKEND_SERVER}/milestones/${milestone.id}`, data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred");
            }
        }) .finally(() => {
              setIsLoading(false);
              editMilestoneModal.onClose();
      })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.COMMENTS){
        return 'Update'
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
      isOpen={editMilestoneModal.isOpen}
      title="Edit milestone"
      actionLabel={actionLabel}
      onClose={editMilestoneModal.onClose}
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

export default EditMilestoneModal;
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
import { Audit, Project, User } from "@prisma/client";
import useEditAuditModal from "@/hooks/editModalHooks/useEditAuditModal";
import DateInput from "@/components/reusable/DateInput";
import { mailUpdates } from "@/actions/mailUpdates";

enum STEPS {
  DATE = 0,
  REVIEW = 1,
  COMMENTS = 2,
  ACTION = 3,
}

interface EditAuditModalProps {
  audit: Audit;
  user: User;
  project: Project;
  onClose: () => void;
}
const EditAuditModal = ({
  audit,
  user,
  project,
  onClose,
}: EditAuditModalProps) => {

  const router = useRouter();
  const editAuditModal = useEditAuditModal();
  const [step, setStep] = useState(STEPS.DATE);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>(audit.date);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      userId: user.id,
      auditId: audit?.id,
      reviewedSection: audit.reviewedSection,
      reviewedBy: audit.reviewedBy,
      status: audit.status,
      actionItem: audit.actionItem,
      date: audit.date,
      comments: audit.comments,
    }
  });


  useEffect(() => {
    reset({
      userId: user.id,
      auditId: audit?.id,
      reviewedSection: audit.reviewedSection,
      reviewedBy: audit.reviewedBy,
      status: audit.status,
      actionItem: audit.actionItem,
      date: audit.date,
      comments: audit.comments,
    });
  }, [audit, reset]);


  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.ACTION){
      return onNext();
    }
    console.log(data)
    setIsLoading(true)
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.put(`${backendServer}/audits/${audit.id}`, data);
        router.refresh();
        toast.success('Success');
    } catch (firstError) {
        try {
            await axios.put(`/api/audits/${audit.id}`, data);;
            router.refresh();
            toast.success('Success (using backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        editAuditModal.onClose();
        onClose();
    }
    await mailUpdates(project.name, project.id);
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.ACTION){
        return 'Update'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DATE){
          return undefined;
      }
      return 'Back'
  }, [step]);

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);


  let bodyContent = (
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
       <DateInput
          label="Audit date"
          selectedDate={date}
          onSelect={setDate}
       />
      </motion.div>
    </div>
  )

  if (step === STEPS.REVIEW){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Reviewes"
          subtitle=""
          center
        />
          <motion.div
              key="reviewedSection"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Input
              id="reviewedSection"
              label="Reviewed section"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
          </motion.div>

          <motion.div
              key="reviewedBy"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Input
              id="reviewedBy"
              label="Reviewed by"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
          </motion.div>


          <motion.div
              key="status"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Input
              id="status"
              label="Status"
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

  if (step === STEPS.ACTION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Action items"
          subtitle=""
          center
        />
        <motion.div
            key="action"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <Textarea
              id="actionItem"
              label="Action items"
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
      isOpen={editAuditModal.isOpen}
      title="Edit audit"
      actionLabel={actionLabel}
      onClose={editAuditModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DATE ? undefined : onBack}
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

export default EditAuditModal;
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
import { mailUpdates } from "@/actions/mailUpdates";
import { DropdownInput } from "@/components/reusable/DropdownInput";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";

enum STEPS {
  DATE = 0,
  REVIEW = 1,
  COMMENTS = 2,
  ACTION = 3,
}

interface AuditModalProps {
  user: any;
  project: any;
  managersAndAuditors: any,
}
const AuditModal = ({
  user,
  project,
  managersAndAuditors,
}: AuditModalProps) => {

  const router = useRouter();
  const auditModal = useAuditModal();
  const [step, setStep] = useState(STEPS.DATE);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [reviewedBy, setReviewedBy] = useState('Reviewed by');
  const [reviewedSection, setReviewedBySection] = useState('Reviewed section');
  const [status, setStatus] = useState('Status');

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
      auditedBy: user?.id,
      reviewedSection: '',
      reviewedBy: '',
      status: '',
      actionItem: '',
      date: undefined,
      comments: '',
    }
  });

  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const handleReviewedBySelect = (value : string) => {
    setReviewedBy(value);
    setValue("reviewedBy", value);
  }

  const handleReviewedSection = (value : string) => {
    setReviewedBySection(value);
    setValue("reviewedSection", value);
  }

  const handleStatusSelect = (value : string) => {
    setStatus(value);
    setValue("status", value);
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.ACTION){
      return onNext();
    }
    console.log(data)
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.post(`${backendServer}/audits`, data);
        router.refresh();
        toast.success('Success');
    } catch (firstError) {
        try {
            await axios.post(`/api/audits`, data);;
            router.refresh();
            toast.success('Success (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
        auditModal.onClose();
    }
    await mailUpdates(project.name, project.id)
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.ACTION){
        return 'Create'
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
            label="Date"
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
            <DropdownInput
              menuItems={['Teams', 'Resources', 
                          'Feedbacks', 'Updates', 'Versions', 'Sprints', 
                          'MoM', 'Scope', 'Stakeholders', 'Escalation',
                        'Risks', 'Milestones', 'Audits']}
              label={reviewedSection}
              onSelect={handleReviewedSection}
            />
          </motion.div>

          <motion.div
              key="reviewedBy"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full h-[4rem] ">
                <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                  {reviewedBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
                <DropdownMenuGroup>
                  {managersAndAuditors.map((item : any, index : any) => (
                      <DropdownMenuItem  
                          key={item.id}
                          className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                          onClick={() => {handleReviewedBySelect(item.name)}}
                      >
                          <span>{item.name}</span>
                      </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </motion.div>


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
      isOpen={auditModal.isOpen}
      title="Project audit"
      actionLabel={actionLabel}
      onClose={auditModal.onClose}
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

export default AuditModal;
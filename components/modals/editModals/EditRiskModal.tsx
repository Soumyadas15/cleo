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
import Textarea from "../../reusable/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "../../ui/calendar";
import { ProgressBar } from "../../ProgressBar";
import { DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuGroup, 
        DropdownMenuItem, 
        DropdownMenuTrigger 
} from "@/components/ui/dropdown";
import useRiskModal from "@/hooks/createModalHooks/useRiskModal";
import { Risk, User } from "@prisma/client";
import useEditRiskModal from "@/hooks/editModalHooks/useEditRiskModal";

enum STEPS {
  TYPE = 0,
  DESCRIPTION = 1,
  SEVERITY = 2,
  IMPACT = 3,
  REMEDIAL = 4,
  STATUS = 5,
  CLOSURE = 6
}

interface EditRiskModalProps {
   risk: Risk;
   user: User;
   onClose: () => void;
}
const EditRiskModal = ({
    risk,
    user,
    onClose
}: EditRiskModalProps) => {

  const router = useRouter();
  const editRiskModal = useEditRiskModal();
  const [step, setStep] = useState(STEPS.TYPE);

  const [closureDate, setClosureDate] = useState<Date>();
  const [riskType, setRiskType] = useState<string>(risk.type);
  const [riskSeverity, setRiskSeverity] = useState<string>(risk.severity);
  const [riskImpact, setRiskImpact] = useState<string>(risk.impact);

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
            riskId: risk.id,
            type: risk.type,
            description: risk.description,
            severity: risk.severity,
            impact: risk.impact,
            remedial: risk.remedialSteps,
            status: risk.status,
            closureDate: risk.closureDate,
            
    }})

    useEffect(() => {
        reset({
            userId: user.id,
            riskId: risk.id,
            type: risk.type,
            description: risk.description,
            severity: risk.severity,
            impact: risk.impact,
            remedial: risk.remedialSteps,
            status: risk.status,
            closureDate: risk.closureDate,
        });
    }, [risk, reset]);

    useEffect(() => {
        if (risk.closureDate) {
          const riskClosureDate = new Date(risk.closureDate);
          setClosureDate(riskClosureDate);
          setValue("closureDate", riskClosureDate);
        }
    }, [risk.closureDate, setValue]);




  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const handleTypeSelect = (value: any) => {
    setRiskType(value);
    setValue('type', value);
  }

  const handleSeveritySelect = (value: any) => {
    setRiskSeverity(value);
    setValue('severity', value);
  }

  const handleImpactSelect = (value: any) => {
    setRiskImpact(value);
    setValue('impact', value);
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.CLOSURE){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.put(`http://127.0.0.1:3001/risks/${risk.id}`, data)
        .then(() => {
            router.refresh();
            toast.success('Success');
        }) .catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred");
            }
        }) .finally(() => {
              setIsLoading(false);
              editRiskModal.onClose()
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.CLOSURE){
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



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Risk type"
        subtitle=""
        center
      />
        <motion.div
            key="severity"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
         <DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full h-[4rem] ">
                <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                    {riskType}
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
                <DropdownMenuGroup>
                    <DropdownMenuItem  
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleTypeSelect("FINANCIAL")}}
                    >
                        FINANCIAL
                    </DropdownMenuItem>
                    <DropdownMenuItem  
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleTypeSelect("OPERATIONAL")}}
                    >
                        OPERATIONAL
                    </DropdownMenuItem>
                    <DropdownMenuItem  
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleTypeSelect("TECHNICAL")}}
                    >
                        TECHNICAL
                    </DropdownMenuItem>
                    <DropdownMenuItem  
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleTypeSelect("HR")}}
                    >
                        HR
                    </DropdownMenuItem>
                    <DropdownMenuItem  
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleTypeSelect("EXTERNAL")}}
                    >
                        EXTERNAL
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
         </DropdownMenu>
          
        </motion.div>
    </div>
  )

  if (step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Description"
          subtitle=""
          center
        />
        <motion.div
            key="description"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Textarea
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.SEVERITY){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Risk Severity"
          subtitle=""
          center
        />
        <motion.div
            key="severity"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full h-[4rem] ">
                    <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                        {riskSeverity}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
                    <DropdownMenuGroup>
                        <DropdownMenuItem  
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                            onClick={() => {handleSeveritySelect("LOW")}}
                        >
                            LOW
                        </DropdownMenuItem>
                        <DropdownMenuItem  
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                            onClick={() => {handleSeveritySelect("MEDIUM")}}
                        >
                            MEDIUM
                        </DropdownMenuItem>
                        <DropdownMenuItem  
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                            onClick={() => {handleSeveritySelect("HIGH")}}
                        >
                            HIGH
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
      </div>
    )
  }

  if (step === STEPS.IMPACT){
        bodyContent = (
            <div className="flex flex-col gap-4">
              <Heading
                title="Risk Impact"
                subtitle=""
                center
              />
              <motion.div
                  key="impact"
                  initial={{ opacity: 0, x: "-50%" }}
                  animate={{ opacity: 1, x: "0%" }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                  <DropdownMenu>
                      <DropdownMenuTrigger className="w-full h-[4rem] ">
                          <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                              {riskImpact}
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
                          <DropdownMenuGroup>
                              <DropdownMenuItem  
                                  className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                                  onClick={() => {handleImpactSelect("LOW")}}
                              >
                                  LOW
                              </DropdownMenuItem>
                              <DropdownMenuItem  
                                  className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                                  onClick={() => {handleImpactSelect("MEDIUM")}}
                              >
                                  MEDIUM
                              </DropdownMenuItem>
                              <DropdownMenuItem  
                                  className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                                  onClick={() => {handleImpactSelect("HIGH")}}
                              >
                                  HIGH
                              </DropdownMenuItem>
                          </DropdownMenuGroup>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </motion.div>
            </div>
          )
  }

  if (step === STEPS.REMEDIAL){
    bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Remedial"
            subtitle=""
            center
          />
          <motion.div
              key="remedial"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Textarea
              id="remedial"
              label="Remedial Steps"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
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

  if (step === STEPS.CLOSURE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Closure date"
          subtitle=""
          center
        />
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
                    {closureDate ? format(closureDate, "PPP") : <span>Closure date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                    mode="single"
                    selected={closureDate}
                    onSelect={setClosureDate}
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
      disabled={isLoading}
      isOpen={editRiskModal.isOpen}
      title="Risk"
      actionLabel={actionLabel}
      onClose={editRiskModal.onClose}
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

export default EditRiskModal;
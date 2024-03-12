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
import useSuccessModal from "@/hooks/useSuccessModal";
import useCreateModal from "@/hooks/useLoginModal";
import { useModal } from "@/hooks/useModalStore";
import { ProgressBar } from "../../ProgressBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/reusable/Textarea";

enum STEPS {
  NAME = 0,
  DESCRIPTION = 1,
  SCOPE = 2,
  CLIENTS = 3,
  MANAGER = 4,
  AUDITOR = 5,
}

interface CreateModalProps {
  user: any;
  managers: any;
  auditors: any;
  clients: any;
}
const CreateModal = ({
  user,
  managers,
  auditors,
  clients
}: CreateModalProps) => {

  const router = useRouter();
  const createModal = useCreateModal();
  const successModal = useSuccessModal();
  const [step, setStep] = useState(STEPS.NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [selectManager, setSelectManager] = useState("Select manager")
  const [selectAuditor, setSelectAuditor] = useState("Select auditor");
  const [selectClient, setSelectClient] = useState("Select client");

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
        createdBy: user?.id,
        name: '',
        client: '',
        scope: '',
        description: '',
        manager: '',
        auditor: '',
    }
})

  const formToggle = () => {
    createModal.onClose();
    successModal.onOpen()
}

  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.AUDITOR){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.post('/api/projects', data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            formToggle();
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.AUDITOR){
        return 'Create'
    }

    return 'Next'
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.NAME){
          return undefined;
      }
      return 'Back'
  }, [step]);

  const handleManagerSelect = (manager: any) => {
    setSelectManager(manager.name);
    setValue('manager', manager.email);
  }

  const handleAuditorSelect = (auditor: any) => {
    setSelectAuditor(auditor.name);
    setValue('auditor', auditor.email);
  }

  const handleClientSelect = (client: any) => {
    setSelectClient(client.name);
    setValue('client', client.email);
  }


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Project name"
        subtitle=""
        center
      />
        <motion.div
            key="name"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project description"
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
              minLength={100}
            />
          </motion.div>
      </div>
    )
  }

  if (step === STEPS.SCOPE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project scope"
          subtitle=""
          center
        />
          <motion.div
              key="scope"
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Textarea
              id="scope"
              label="Scope"
              disabled={isLoading}
              register={register}  
              errors={errors}
              required
            />
          </motion.div>
      </div>
    )
  }

  if (step === STEPS.CLIENTS){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add clients"
          subtitle=""
          center
        />
        <motion.div
            key="client"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-[4rem] ">
              <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                {selectClient}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
              <DropdownMenuGroup>
                {clients.map((client : any, index : any) => (
                    <DropdownMenuItem  
                        key={client.id}
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleClientSelect(client)}}
                    >
                        <span>{client.name}</span>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.MANAGER){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Project manager"
          subtitle=""
          center
        />
        <motion.div
            key="manager"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-[4rem] ">
              <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                {selectManager}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
              <DropdownMenuGroup>
                {managers.map((manager : any, index : any) => (
                    <DropdownMenuItem  
                        key={manager.id}
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleManagerSelect(manager)}}
                    >
                        <span>{manager.name}</span>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.AUDITOR){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Auditor"
          subtitle=""
          center
        />
        <motion.div
            key="auditor"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-[4rem] ">
              <Button variant="outline" className="w-full h-full border-neutral-300 flex justify-start">
                {selectAuditor}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[29rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
              <DropdownMenuGroup>
                {auditors.map((auditor : any, index : any) => (
                    <DropdownMenuItem  
                        key={auditor.id}
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => {handleAuditorSelect(auditor)}}
                    >
                        <span>{auditor.name}</span>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        
      </div>
    )
  }


  return (
    <Modal
      disabled={isLoading}
      isOpen={createModal.isOpen}
      title="New project"
      actionLabel={actionLabel}
      onClose={createModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.NAME ? undefined : onBack}
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

export default CreateModal;
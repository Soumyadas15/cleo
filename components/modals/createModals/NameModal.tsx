'use client';

import { useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { motion } from 'framer-motion';
import Modal from "../Modal";
import Heading from "../../reusable/Heading";
import Input from "../../reusable/Input";
import useNameModal from "@/hooks/createModalHooks/useNameModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NameModalProps {
  user: any;
}
const NameModal = ({
  user,
}: NameModalProps) => {

  const nameModal = useNameModal();
  const router = useRouter();

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
            userId: user?.id,
            name: '',
        }
    })


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    })
  }

  const isEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
   }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isEmail(data.name)){
        toast.error("Name cannot be an email");
        return
    }
    setIsLoading(true)
    axios.post('/api/user', data)
        .then(() => {
            router.refresh();
            toast.success('Name updated');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            nameModal.onClose()
    })
  }


  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="What's your name?"
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


  return (
    <Modal
      disabled={isLoading}
      isOpen={isEmail(user.name)}
      title="Details"
      actionLabel="Done"
      onClose={() => {}}
      secondaryAction={nameModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      showCloseIcon={false}
    />
  );
}

export default NameModal;
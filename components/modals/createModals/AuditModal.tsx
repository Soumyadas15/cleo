"use client"

import { useState, useEffect } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { motion } from 'framer-motion';
import Modal from "../Modal";
import Heading from "../../reusable/Heading";
import Textarea from "../../reusable/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";

interface AuditModalProps {
  project: any;
  user: any;
}

const AuditModal = ({
  project,
  user,
}: AuditModalProps) => {


  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const auditModal = useAuditModal();
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      projectId: project?.id,
      auditedBy: user?.id,
      date: undefined,
      content: '',
    }
  });

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    axios.post('/api/audits', data)
        .then(() => {
            router.refresh();
            toast.success('Done');
        }) .catch((error) => {
            toast.error(error.message);
        }) .finally(() => {
            setIsLoading(false);
            auditModal.onClose();
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Audit details" subtitle="" center />
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
              {date ? format(date, "PPP") : <span>Pick a date</span>}
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
      <motion.div
        key="content"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Textarea
          id="content"
          label="Content"
          register={register}
          errors={errors}
          required
        />
      </motion.div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={auditModal.isOpen}
      title="Project audit"
      actionLabel="Done"
      onClose={auditModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={auditModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AuditModal;

"use client"

import Input from "@/components/reusable/Input"
import Textarea from "@/components/reusable/Textarea"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import useCreateFlowModal from "@/hooks/createModalHooks/useCreateFlowModal"
import { Project, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface CreateFLowProps {
    project: Project;
    user: User;
}
export const CreateFlow = ({
    project,
    user,
}: CreateFLowProps) =>{

    const [loading, isLoading] = useState(false);
    const router = useRouter();

    const createFlowModal = useCreateFlowModal()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
      } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          description: '',
          userId: user.id,
          projectId: project.id,
        }
      });
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        isLoading(true);
        axios.post('/api/flows', data)
        .then(() => {
            router.refresh();
            toast.success('Workflow created');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            isLoading(false);
            createFlowModal.onClose()
    })
    }

    return (
        <Drawer open={createFlowModal.isOpen}>
            <DrawerTrigger asChild>
                <Button onClick={createFlowModal.onOpen}>New Workflow</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Details</DrawerTitle>
                    <DrawerDescription>Set name and description</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 flex flex-col gap-2">
                    <Input
                        id="name"
                        label="Name"
                        disabled={false}
                        register={register}  
                        errors={errors}
                        required
                    />
                    <Textarea
                        id="description"
                        label="Description"
                        disabled={false}
                        register={register}  
                        errors={errors}
                        required
                    />
                </div>
                <DrawerFooter>
                    <Button 
                        onClick={handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        Submit
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={createFlowModal.onClose}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
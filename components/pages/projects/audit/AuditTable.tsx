"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useAuditModal from "@/hooks/useAuditModal"
import useDeleteAuditModal from "@/hooks/useDeleteAuditModal"
import useEditAuditModal from "@/hooks/useEditAuditModal"
import { format } from 'date-fns'
import { Pen, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AuditTableProps {
  project: any;
  audits: any
}

export const AuditTable = ({
  project,
  audits,
}: AuditTableProps) => {

  const router = useRouter();
  const editAuditModal = useEditAuditModal();
  const deleteAuditModal = useDeleteAuditModal();
  const [clicked, setClicked] = useState(false);

  const clickEdit = (audit : any) => {
    router.push(`/main/projects/${project.id}/audits/${audit.id}`)
    editAuditModal.onOpen();
  }

  const clickDelete = (audit : any) => {
    router.push(`/main/projects/${project.id}/audits/${audit.id}`)
    deleteAuditModal.onOpen();
  }

  const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
      router.push(`/main/projects/${project.id}`);
  };

  return (
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-slate-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[180px] font-bold">Date</TableHead>
          <TableHead className="font-bold w-[45rem]">Body</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {audits.map((audit: any, index: number) => (
          <TableRow key={audit.id} className="dark:border-slate-600">
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{format(new Date(audit.date), 'MMM do yyyy')}</TableCell>
              <TableCell>{audit.body}</TableCell>
              <TableCell className="flex items-center justify-center gap-5">
                  <Pen
                      className="scale-[0.7] hover:opacity-75 hover:cursor-pointer transition"
                      onClick={() => {clickEdit(audit)}}
                  />
                  <Trash
                      className="scale-[0.7] hover:opacity-50 hover:cursor-pointer transition text-red-600"
                      onClick={() => {clickDelete(audit)}}
                  />
              </TableCell>
          </TableRow>
      ))}
      </TableBody>
    </Table>
  )
}
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
import useEditAuditModal from "@/hooks/useEditAuditModal"
import { format } from 'date-fns'
import { Pen } from "lucide-react"
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

  const clickEdit = (audit : any) => {
    router.push(`/main/projects/${project.id}/audits/${audit.id}`)
    editAuditModal.onOpen();
  }

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
          <TableRow className="dark:border-slate-600">
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{format(new Date(audit.date), 'MMM do yyyy')}</TableCell>
            <TableCell>{audit.body}</TableCell>
            <TableCell className="flex items-center justify-center">
              <Pen 
                className="scale-[0.8] hover:opacity-75 hover:cursor-pointer transition"
                onClick={() => {clickEdit(audit)}}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
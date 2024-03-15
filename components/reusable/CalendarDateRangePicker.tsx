"use client";


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { addDays, format } from "date-fns";
import { DownloadIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { generatePDF } from "@/lib/generatePdf";


interface CalendarDateRangePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  project: Project;
}
export function CalendarDateRangePicker({
  className,
  project,

}: CalendarDateRangePickerProps) {

  const router  = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const jsonData: any[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    // Add more data as needed
  ];

  const handleGeneratePDF = () => {
    const pdfDoc = generatePDF(jsonData);
    pdfDoc.save('data.pdf');
  };

  const rangeData = {
    startDate: date?.from,
    endDate: date?.to,
    projectId: project.id
  };

  const handleDownloadPDF = async () => {
    setLoading2(true);
    try {
      const response = await axios.post('/api/pdf', rangeData);
      const pdfData = response.data; // Assuming the API returns data for PDF generation
      const pdfDoc = generatePDF(pdfData);
      pdfDoc.save('data.pdf');
      toast.success('PDF generated successfully');
      console.log(pdfData)
    } catch (error) {
      toast.error("Error generating PDF");
    } finally {
      setLoading2(false);
    }
  };
  



  const formattedDateRange = date && date.from && date.to
                                ? `${format(date.from, 'MM/dd/yyyy')} - ${format(date.to, 'MM/dd/yyyy')}`
                                : '';

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            id="date"
            className={cn(
              " justify-start text-left font-normal",
            )}
          >
            <div className="flex items-center gap-2">
                <DownloadIcon size={18}/>
                <div>Download</div>
            </div>

          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[50rem] flex flex-col items-center p-7 w-[36rem] dark:border-none dark:bg-neutral-900">
            <DialogHeader>
                <DialogTitle>Download report</DialogTitle>
            </DialogHeader>
                <div className="">
                    <div className="flex items-center">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </div>
                    
                    <div className="w-full flex flex-col items-center justify-between mt-4">
                        <Button className=" w-full mb-2">
                          {loading ? 'Downloading...' : `Download report for ${formattedDateRange}`}
                        </Button>
                        <Button variant={'outline'} className="w-full" onClick={handleDownloadPDF}>
                          {loading2 ? 'Downloading...' : `Download full report`}
                        </Button>
                    </div>
                </div>
        </DialogContent>
      </Dialog>
  );
}
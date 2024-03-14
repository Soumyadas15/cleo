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

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  const [loading, setLoading] = React.useState(false);

  const handleDownloadPDF = async () => {
    try {
      await axios.get('api/pdf')
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setLoading(false);
    }
    console.log("clicked")
  };

  const formattedDateRange = date ? `${format(date.from!, 'MM/dd/yyyy')} - ${format(date.to!, 'MM/dd/yyyy')}` : '';

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
        <DialogContent className="max-w-[50rem] w-[36rem]">
            <DialogHeader>
                <DialogTitle>Download report</DialogTitle>
            </DialogHeader>
                <div>
                    <div className="">
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
                        <Button className=" w-full mb-2" onClick={handleDownloadPDF}>
                        {loading ? 'Downloading...' : 'Download PDF'}
                        </Button>
                        <Button variant={'outline'} className="w-full">
                            Download full report
                        </Button>
                    </div>
                </div>
        </DialogContent>
      </Dialog>
  );
}
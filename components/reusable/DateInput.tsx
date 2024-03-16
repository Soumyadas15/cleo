// components/reusable/DateInput.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateInputProps {
  label: string;
  selectedDate: Date | undefined;
  onSelect: (date: Date) => void;
  disabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ label, selectedDate, onSelect, disabled }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full border-[1px] border-neutral-300 rounded-[5px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          //@ts-ignore
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
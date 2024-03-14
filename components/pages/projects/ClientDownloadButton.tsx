import { Button } from "@/components/reusable/Button"
import { CalendarDateRangePicker } from "@/components/reusable/CalendarDateRangePicker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown";
import { DownloadIcon } from "lucide-react"

interface ClientDownloadButtonProps {
    project: any;
    user: any;
}
export const ClientDownloadButton = ({
    project,
    user
} : ClientDownloadButtonProps) => {
    return (
        <CalendarDateRangePicker/>
    )
}
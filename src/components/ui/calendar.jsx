import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"; // Ensure this is imported!

import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"

function Calendar({
    className,
    showOutsideDays = true,
    ...props
}) {
    return (
        <div className={cn("p-3", className)}>
            <DayPicker
                showOutsideDays={showOutsideDays}
                modifiersClassNames={{
                    selected: "bg-rubik-blue text-white hover:bg-rubik-blue hover:text-white focus:bg-rubik-blue focus:text-white rounded-md",
                    today: "font-bold text-rubik-blue bg-blue-50 rounded-md"
                }}
                {...props}
            />
            <style>{`
            .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #3b82f6;
                --rdp-background-color: #e0f2fe;
                margin: 0;
            }
            .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
                background-color: #3b82f6; 
                color: white;
            }
            .rdp-day_today {
                 font-weight: bold;
            }
        `}</style>
        </div>
    )
}
Calendar.displayName = "Calendar"

export { Calendar }

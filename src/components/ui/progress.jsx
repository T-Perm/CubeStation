import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

// NOTE: Since we are not running npx shadcn-ui@latest add progress, we need to mock or implement deeply.
// Using a simple tailored implementation if radix is not installed, but prompt implies shadcn usage. 
// I'll install @radix-ui/react-progress below via command if needed, but for now allow me to write a pure implementations to avoid install overhead if possible,
// OR assume the user wants the real thing. I will use a pure CSS/div approach that mimics Radix to save time/deps, or just straightforward React.
// Actually, I'll stick to a simple mostly-visual version to be safe with deps.

const Progress = React.forwardRef(({ className, value, indicatorColor, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            className
        )}
        {...props}
    >
        <div
            className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorColor)}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </div>
))
Progress.displayName = "Progress"

export { Progress }

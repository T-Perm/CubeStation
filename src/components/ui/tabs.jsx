import * as React from "react"
import { cn } from "../../lib/utils"

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
))
Tabs.displayName = "Tabs"

// Simple context to handle state
const TabsContext = React.createContext({ value: "", onValueChange: () => { } })

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value: triggerValue, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(TabsContext)
    const isSelected = value === triggerValue

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isSelected && "bg-background text-foreground shadow-sm",
                className
            )}
            onClick={() => onValueChange(triggerValue)}
            {...props}
        />
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value: contentValue, ...props }, ref) => {
    const { value } = React.useContext(TabsContext)
    if (value !== contentValue) return null
    return (
        <div
            ref={ref}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        />
    )
})
TabsContent.displayName = "TabsContent"

const TabsRoot = ({ defaultValue, value, onValueChange, children, ...props }) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const controlled = value !== undefined
    const currentValue = controlled ? value : internalValue
    const handleValueChange = (val) => {
        if (!controlled) setInternalValue(val)
        if (onValueChange) onValueChange(val)
    }

    return (
        <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
            <Tabs {...props}>{children}</Tabs>
        </TabsContext.Provider>
    )
}

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent }

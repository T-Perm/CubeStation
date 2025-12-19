"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export function Menu({ trigger, children, align = "left", showChevron = true }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative inline-block text-left">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer inline-flex items-center"
                role="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {trigger}
                {showChevron && (
                    <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                )}
            </div>

            {isOpen && (
                <div
                    className={`absolute ${align === "right" ? "right-0" : "left-0"
                        } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1" role="none">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, label, ...props }) {
    return (
        <button
            className={`relative flex items-center w-full h-16 group transition-all
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-gray-600 dark:text-gray-300"}
        ${isActive ? "bg-white/10" : "hover:bg-gray-100 dark:hover:bg-gray-700/50"}
      `}
            role="menuitem"
            onClick={onClick}
            disabled={disabled}
            aria-label={props["aria-label"] || label}
            {...props}
        >
            <div className="flex items-center justify-center w-16 h-16 shrink-0">
                {icon && (
                    <span className="h-6 w-6 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5] flex items-center justify-center">
                        {icon}
                    </span>
                )}
            </div>

            {/* Hover Label */}
            {(label || children) && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-neutral-900 dark:bg-neutral-800 text-white text-xs font-bold rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-[100] border border-white/10">
                    {label || children}
                </div>
            )}
        </button>
    )
}

export function MenuContainer({ children }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = React.Children.toArray(children)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="relative w-[64px]" data-expanded={isExpanded}>
            {/* Container for all items */}
            <div className="relative">
                {/* First item - always visible */}
                <div
                    className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 cursor-pointer rounded-full group will-change-transform z-50 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                    onClick={handleToggle}
                >
                    {childrenArray[0]}
                </div>

                {/* Other items */}
                {childrenArray.slice(1).map((child, index) => (
                    <div
                        key={index}
                        className="absolute top-0 left-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-md will-change-transform flex items-center justify-center overflow-hidden"
                        style={{
                            transform: `translateY(${isExpanded ? (index + 1) * 68 : 0}px)`,
                            opacity: isExpanded ? 1 : 0,
                            zIndex: 40 - index,
                            transition: `transform ${isExpanded ? '400ms' : '300ms'} cubic-bezier(0.34, 1.56, 0.64, 1),
                         opacity ${isExpanded ? '300ms' : '200ms'}`,
                            backfaceVisibility: 'hidden',
                            pointerEvents: isExpanded ? 'auto' : 'none'
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}

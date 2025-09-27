import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-gray-50 shadow-sm hover:bg-blue/90 active:scale-95",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  spinning?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  spinning,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const isSpinning = loading || spinning

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), {
        "cursor-wait": loading,
      })}
      disabled={props.disabled || loading}
      {...props}
    >
      {isSpinning ? (
        <span
          className={cn(
            "inline-block size-4 rounded-full border-2 border-muted-foreground/30 animate-spin",
            variant === "default" && "border-t-blue-600 dark:border-t-blue-400",
            variant === "destructive" && "border-t-red-600 dark:border-t-red-400",
            variant === "secondary" && "border-t-gray-600 dark:border-t-gray-400",
            variant === "outline" && "border-t-gray-500 dark:border-t-gray-300",
            variant === "ghost" && "border-t-gray-400 dark:border-t-gray-200",
            variant === "link" && "border-t-blue-500 dark:border-t-blue-300"
          )}
        />
      ) : null}

      {/* Keep text visible even when loading */}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }

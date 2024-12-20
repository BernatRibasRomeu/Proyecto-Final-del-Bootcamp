import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../utils/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-lg",
        secondary:
          "border-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg",
        destructive:
          "border-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-lg",
        outline: "border-2 border-foreground text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        "px-4 py-2 text-sm font-medium shadow-md rounded-full", // Aumento de padding y ajustes para más visibilidad
        "bg-opacity-80", // Opacidad para hacer el fondo más oscuro y mejorar el contraste
        "text-white", // Color de texto blanco para mejor contraste
        "shadow-lg", // Agregar sombra para destacar más
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

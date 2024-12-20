// Progress.tsx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "../../utils/utils"

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>>(
  ({ className, value = 0, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-primary transition-all"
        style={{ width: `${value}%` }} // Cambiado para usar 'width' directamente
      />
    </ProgressPrimitive.Root>
  )
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

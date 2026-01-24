import { cn } from "@/lib/utils"

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "bg-card min-w-64 flex-1 space-y-1 rounded-lg px-14 py-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h3 className={cn("text-3xl font-semibold", className)}>{children}</h3>
}

export const CardIcon = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-2">{children}</div>
  )
}

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span className={cn("block text-center text-base font-normal", className)}>
      {children}
    </span>
  )
}

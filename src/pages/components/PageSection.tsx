import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: React.ReactNode
}

export const PageSection = ({ children }: PageSectionProps) => {
  return <section className="px w-full px-8 pt-16">{children}</section>
}

export const PageSectionContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn("bg-card mt-6 w-full rounded-lg p-6 shadow-sm", className)}
    >
      {children}
    </div>
  )
}

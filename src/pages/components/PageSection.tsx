interface PageSectionProps {
  children: React.ReactNode
}

export const PageSection = ({ children }: PageSectionProps) => {
  return <section className="px w-full px-8 pt-16">{children}</section>
}

export const PageSectionContent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="bg-card mt-6 w-full rounded-lg p-6 shadow-sm">
      {children}
    </div>
  )
}

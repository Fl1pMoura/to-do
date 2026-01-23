export const TasksWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-3">{children}</div>
}

export const TaskWrapperHeader = ({
  title,
  icon,
}: {
  title: string
  icon: React.ReactNode
}) => {
  return (
    <div className="border-border text-muted-foreground mb-1 flex w-full items-center gap-2 border-b pb-2">
      {icon}
      <h3 className="text-sm font-semibold capitalize">{title}</h3>
    </div>
  )
}

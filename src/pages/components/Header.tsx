interface PagesHeaderProps {
  description: string
  title: string
  children: React.ReactNode
}

export const PagesHeader = ({
  description,
  title,
  children,
}: PagesHeaderProps) => {
  return (
    <header className="flex w-full justify-between">
      <div>
        <span className="text-primary text-xs leading-snug font-semibold">
          {description}
        </span>
        <h2 className="text-xl leading-snug font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-2.5">{children}</div>
    </header>
  )
}

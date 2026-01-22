import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

interface NavigationLinkProps {
  to: string
  children: React.ReactNode
}

export const NavigationLink = ({ to, children }: NavigationLinkProps) => {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex w-full items-center gap-2 rounded-xl px-6 py-3",
            isActive && "bg-primary/15 text-primary"
          )
        }
      >
        {children}
      </NavLink>
    </li>
  )
}

export const NavigationWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <nav>
      <ul className="w-full space-y-2 p-2">{children}</ul>
    </nav>
  )
}

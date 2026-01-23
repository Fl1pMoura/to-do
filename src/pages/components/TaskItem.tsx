import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon, Loader2Icon, SquarePenIcon } from "lucide-react"
import { Link } from "react-router"

export const TaskItem = ({
  status,
}: {
  status: "not_started" | "in_progress" | "completed"
}) => {
  return (
    <li
      className={cn(
        "flex w-full items-center rounded-lg px-4 py-3",
        status === "not_started" && "bg-foreground/5",
        status === "in_progress" && "bg-chart-2/10",
        status === "completed" && "bg-primary/10"
      )}
    >
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-sm text-white",
          status === "not_started" && "bg-[#D9D9D9]",
          status === "in_progress" && "bg-chart-2",
          status === "completed" && "bg-primary"
        )}
      >
        {status === "completed" && <CheckIcon className="size-4" />}
        {status === "in_progress" && (
          <Loader2Icon className="size-4 animate-spin" />
        )}
      </div>
      <h4 className="mr-auto ml-2.5 text-sm">Task 1</h4>
      <Button variant="ghost" asChild>
        <Link to="/tasks/1">
          <SquarePenIcon className="size-4" />
        </Link>
      </Button>
    </li>
  )
}

import { Button } from "@/components/ui/button"
import type { Task } from "@/entities/Task"
import type { WithQueryStatus } from "@/entities/utils"
import { cn } from "@/lib/utils"
import { CheckIcon, Loader2Icon, SquarePenIcon } from "lucide-react"
import { Link } from "react-router"

export const TaskItem = ({ task }: { task: WithQueryStatus<Task> }) => {
  return (
    <li
      className={cn(
        "flex w-full items-center rounded-lg px-4 py-3",
        task.status === "not_started" && "bg-foreground/5",
        task.status === "in_progress" && "bg-chart-2/10",
        task.status === "completed" && "bg-primary/10",
        task.queryStatus === "pending" && "animate-pulse"
      )}
    >
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-sm text-white",
          task.status === "not_started" && "bg-[#D9D9D9]",
          task.status === "in_progress" && "bg-chart-2",
          task.status === "completed" && "bg-primary"
        )}
      >
        {task.status === "completed" && <CheckIcon className="size-4" />}
        {task.status === "in_progress" && (
          <Loader2Icon className="size-4 animate-spin" />
        )}
      </div>
      <h4 className="mr-auto ml-2.5 text-sm">{task.title}</h4>
      <Button variant="ghost" disabled={task.queryStatus === "pending"}>
        <Link to={`/tasks/${task.id}`}>
          <SquarePenIcon className="size-4" />
        </Link>
      </Button>
    </li>
  )
}

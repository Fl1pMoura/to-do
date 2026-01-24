import {
  Card,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/pages/components/Card"
import type { TasksQueryData } from "@/services/tasks/data/get-tasks"
import { LayoutListIcon, ListTodoIcon, Loader2Icon } from "lucide-react"

const TasksSummary = ({ data }: { data: TasksQueryData }) => {
  const completedTasks = data?.filter((task) => task.status === "completed")
  const inProgressTasks = data?.filter((task) => task.status === "in_progress")
  const notStartedTasks = data?.filter((task) => task.status === "not_started")
  return (
    <div className="mt-6 grid grid-cols-4 gap-8">
      <Card>
        <CardHeader>
          <CardIcon>
            <LayoutListIcon className="text-primary size-6" />
          </CardIcon>
          <CardTitle>{notStartedTasks?.length}</CardTitle>
        </CardHeader>
        <CardDescription>Tarefas disponíveis</CardDescription>
      </Card>
      <Card>
        <CardHeader>
          <CardIcon>
            <ListTodoIcon className="text-primary size-6" />
          </CardIcon>
          <CardTitle>{completedTasks?.length}</CardTitle>
        </CardHeader>
        <CardDescription>Tarefas Concluídas</CardDescription>
      </Card>
      <Card>
        <CardHeader>
          <CardIcon>
            <Loader2Icon className="text-primary size-6" />
          </CardIcon>
          <CardTitle>{inProgressTasks?.length}</CardTitle>
        </CardHeader>
        <CardDescription>Tarefas em andamento</CardDescription>
      </Card>
      <Card>
        <CardHeader>
          <CardIcon>
            <LayoutListIcon className="text-primary size-6" />
          </CardIcon>
          <CardTitle>{data?.length}</CardTitle>
        </CardHeader>
        <CardDescription>Todas as tarefas</CardDescription>
      </Card>
    </div>
  )
}

export default TasksSummary

import { Button } from "@/components/ui/button"
import { useGetTasks } from "@/services/tasks/data/get-tasks"
import { MoonIcon, PlusIcon, SunIcon, SunsetIcon } from "lucide-react"
import CreateTaskDialog from "../components/CreateTaskDialog"
import { PagesHeader } from "../components/Header"
import { PageSection, PageSectionContent } from "../components/PageSection"
import { TaskItem } from "../components/TaskItem"
import { TasksWrapper, TaskWrapperHeader } from "../components/Tasks"

const Tasks = () => {
  const { data } = useGetTasks()

  const morningTasks = data?.filter((task) => task.tag === "morning")
  const afternoonTasks = data?.filter((task) => task.tag === "afternoon")
  const eveningTasks = data?.filter((task) => task.tag === "evening")

  return (
    <PageSection>
      <PagesHeader description="Início" title="Minhas Tarefas">
        <CreateTaskDialog>
          <Button type="button">
            Nova tarefa <PlusIcon className="size-4" />
          </Button>
        </CreateTaskDialog>
      </PagesHeader>
      <PageSectionContent className="space-y-6">
        <TasksWrapper>
          <TaskWrapperHeader
            title="Manhã"
            icon={<SunIcon className="size-4" />}
          />
          <ul className="space-y-3">
            {morningTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </TasksWrapper>
        <TasksWrapper>
          <TaskWrapperHeader
            title="Tarde"
            icon={<SunsetIcon className="size-4" />}
          />
          <ul className="space-y-3">
            {afternoonTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </TasksWrapper>
        <TasksWrapper>
          <TaskWrapperHeader
            title="Noite"
            icon={<MoonIcon className="size-4" />}
          />
          <ul className="space-y-3">
            {eveningTasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </TasksWrapper>
      </PageSectionContent>
    </PageSection>
  )
}

export default Tasks

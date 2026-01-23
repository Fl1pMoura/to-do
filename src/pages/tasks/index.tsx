import { Button } from "@/components/ui/button"
import { MoonIcon, PlusIcon, SunIcon, SunsetIcon } from "lucide-react"
import { PagesHeader } from "../components/Header"
import { PageSection, PageSectionContent } from "../components/PageSection"
import { TaskItem } from "../components/TaskItem"
import { TasksWrapper, TaskWrapperHeader } from "../components/Tasks"

const Tasks = () => {
  return (
    <PageSection>
      <PagesHeader description="Início" title="Minhas Tarefas">
        <Button>
          Nova tarefa <PlusIcon className="size-4" />
        </Button>
      </PagesHeader>
      <PageSectionContent className="space-y-6">
        <TasksWrapper>
          <TaskWrapperHeader
            title="Manhã"
            icon={<SunIcon className="size-4" />}
          />
          <ul className="space-y-3">
            <TaskItem status="not_started" />
            <TaskItem status="in_progress" />
            <TaskItem status="completed" />
          </ul>
        </TasksWrapper>
        <TasksWrapper>
          <TaskWrapperHeader
            title="Tarde"
            icon={<SunsetIcon className="size-4" />}
          />
          <ul className="space-y-3">
            <TaskItem status="not_started" />
            <TaskItem status="in_progress" />
            <TaskItem status="completed" />
          </ul>
        </TasksWrapper>
        <TasksWrapper>
          <TaskWrapperHeader
            title="Noite"
            icon={<MoonIcon className="size-4" />}
          />
          <ul className="space-y-3">
            <TaskItem status="not_started" />
            <TaskItem status="in_progress" />
            <TaskItem status="completed" />
          </ul>
        </TasksWrapper>
      </PageSectionContent>
    </PageSection>
  )
}

export default Tasks

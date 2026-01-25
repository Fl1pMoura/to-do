import { Button } from "@/components/ui/button"
import { useGetTasks } from "@/services/tasks/data/get-tasks"
import { PlusIcon } from "lucide-react"
import CreateTaskDialog from "../components/CreateTaskDialog"
import { PagesHeader } from "../components/Header"
import { PageSection, PageSectionContent } from "../components/PageSection"
import { TaskItem } from "../components/TaskItem"
import TasksSummary from "./components/TasksSummary"

const Home = () => {
  const { data } = useGetTasks()
  return (
    <PageSection>
      <PagesHeader description="Início" title="Minhas Tarefas">
        <CreateTaskDialog>
          <Button type="button">
            Nova tarefa <PlusIcon className="size-4" />
          </Button>
        </CreateTaskDialog>
      </PagesHeader>
      <TasksSummary data={data ?? []} />
      <div className="flex gap-8">
        <PageSectionContent>
          <h3 className="text-xl leading-normal font-semibold">Tarefas</h3>
          <span className="text-muted-foreground text-sm">
            Resumo das tarefas disponíveis
          </span>
          <ul className="mt-6 space-y-3">
            {data?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </PageSectionContent>
      </div>
    </PageSection>
  )
}

export default Home

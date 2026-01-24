import { Button } from "@/components/ui/button"
import { useGetTasks } from "@/services/tasks/data/get-tasks"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { PagesHeader } from "../components/Header"
import { PageSection } from "../components/PageSection"
import TasksSummary from "./components/TasksSummary"

const Home = () => {
  const { data } = useGetTasks()
  return (
    <PageSection>
      <PagesHeader description="Início" title="Minhas Tarefas">
        <Button variant={"ghost"}>
          Limpar tarefas <Trash2Icon className="size-4" />
        </Button>
        <Button>
          Nova tarefa <PlusIcon className="size-4" />
        </Button>
      </PagesHeader>
      <TasksSummary data={data ?? []} />
    </PageSection>
  )
}

export default Home

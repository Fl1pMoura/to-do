import { Button } from "@/components/ui/button"
import { useGetTasks } from "@/services/tasks/data/get-tasks"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { PagesHeader } from "../components/Header"
import { PageSection, PageSectionContent } from "../components/PageSection"

const Home = () => {
  const { data } = useGetTasks()

  console.log(data)
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
      <PageSectionContent>
        <h1>Minhas Tarefas</h1>
        {data.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.tag}</p>
            <p>{task.status}</p>
          </div>
        ))}
      </PageSectionContent>
    </PageSection>
  )
}

export default Home

import { Button } from "@/components/ui/button"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { PagesHeader } from "../components/Header"
import { PageSection, PageSectionContent } from "../components/PageSection"

const Home = () => {
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
      </PageSectionContent>
    </PageSection>
  )
}

export default Home

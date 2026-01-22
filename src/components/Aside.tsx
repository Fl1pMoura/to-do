import { HomeIcon, ListTodoIcon } from "lucide-react"
import { NavigationLink, NavigationWrapper } from "./NavigationLink"

const Aside = () => {
  return (
    <aside className="bg-card h-full min-w-72">
      <header className="space-y-4 px-8 py-6">
        <h1 className="text-primary text-xl font-semibold">Task Manager</h1>
        <p className="max-w-38 text-xs leading-snug">
          Um simples{" "}
          <strong className="text-primary font-semibold">
            organizador de tarefas
          </strong>
        </p>
      </header>
      <NavigationWrapper>
        <NavigationLink to="/">
          <HomeIcon className="size-6" /> Início
        </NavigationLink>
        <NavigationLink to="/tasks">
          <ListTodoIcon className="size-6" /> Minhas Tarefas
        </NavigationLink>
      </NavigationWrapper>
    </aside>
  )
}

export default Aside

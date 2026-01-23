import type { Task } from "@/entities/Task"
import type { WithQueryStatus } from "@/entities/utils"
import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."

export type TasksQueryData = WithQueryStatus<Task>[]

export function useGetTasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await tasksService.getAll()
      return tasks as TasksQueryData
    },
    staleTime: 1000 * 60 * 5, // considera dados "frescos" por 5 minutos
  })
  return { data: data, isLoading }
}

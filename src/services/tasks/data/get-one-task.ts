import type { Task } from "@/entities/Task"
import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."

interface useGetOneTaskProps {
  id: string
  reset(task: Task): void
}

export function useGetOneTask({ id, reset }: useGetOneTaskProps) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const task = await tasksService.getOne(id)
      reset(task)
      return task
    },
  })
}

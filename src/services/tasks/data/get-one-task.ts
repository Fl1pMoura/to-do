import type { Task } from "@/entities/Task"
import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."
import { queryKeys } from "../query-keys"

interface useGetOneTaskProps {
  id: string
  reset(task: Task): void
}

export function useGetOneTask({ id, reset }: useGetOneTaskProps) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: async () => {
      const task = await tasksService.getOne(id)
      reset(task)
      return task
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

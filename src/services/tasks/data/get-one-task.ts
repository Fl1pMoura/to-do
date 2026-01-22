import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."

export function useGetOneTask(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => tasksService.getOne(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // considera dados "frescos" por 5 minutos
  })
}

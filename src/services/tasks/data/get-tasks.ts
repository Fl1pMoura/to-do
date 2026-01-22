import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."

export function useGetTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getAll,
    initialData: [],
  })
}

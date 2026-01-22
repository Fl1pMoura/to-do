import { useQuery } from "@tanstack/react-query"
import { tasksService } from ".."

export function useGetTasks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getAll,
    initialData: [],
  })

  return { data, isLoading, error }
}

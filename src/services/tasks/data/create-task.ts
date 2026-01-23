import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { v4 } from "uuid"
import { tasksService } from ".."
import type { TasksQueryData } from "./get-tasks"

export function useCreateTask() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: tasksService.create,
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      const tmpId = v4()
      context.client.setQueryData<TasksQueryData>(["tasks"], (old = []) => [
        ...old,
        { ...variables, id: tmpId, queryStatus: "pending" },
      ])
      return { tmpId }
    },
    onSuccess: async (result, _variables, onMutateResult, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      context.client.setQueryData<TasksQueryData>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === onMutateResult?.tmpId
            ? { ...result, queryStatus: "success" }
            : task
        )
      )
    },
    onError: async (_error, _variables, onMutateResult, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      context.client.setQueryData<TasksQueryData>(["tasks"], (old = []) =>
        old.filter((task) => task.id !== onMutateResult?.tmpId)
      )
      toast.error("Erro ao criar tarefa")
    },
  })
  return { createTask: mutateAsync, isPending }
}

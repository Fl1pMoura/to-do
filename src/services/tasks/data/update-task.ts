import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { tasksService } from ".."
import { queryKeys } from "../query-keys"

export function useUpdateTask() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: tasksService.update,
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({
        queryKey: queryKeys.tasks.detail(String(variables.id)),
      })

      const previousTask = context.client.getQueryData(
        queryKeys.tasks.detail(String(variables.id))
      )
      const previousTasks = context.client.getQueryData<Task[]>(
        queryKeys.tasks.all
      )

      context.client.setQueryData<Task>(
        queryKeys.tasks.detail(String(variables.id)),
        variables
      )
      context.client.setQueryData<Task[]>(queryKeys.tasks.all, (old = []) =>
        old.map((task) => (task.id === variables.id ? variables : task))
      )
      return { previousTask, previousTasks }
    },
    onSuccess: async () => {
      toast.success("Tarefa atualizada com sucesso")
    },
    onError: async (_, variables, onMutateResult, context) => {
      await context.client.cancelQueries({
        queryKey: queryKeys.tasks.detail(String(variables.id)),
      })

      // Reverte a mutação (rollback)
      if (onMutateResult?.previousTask) {
        context.client.setQueryData(
          queryKeys.tasks.detail(String(variables.id)),
          onMutateResult.previousTask
        )
      }
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(
          queryKeys.tasks.all,
          onMutateResult.previousTasks
        )
      }
      toast.error("Erro ao atualizar tarefa")
    },
  })
  return { updateTask: mutateAsync, isPending }
}

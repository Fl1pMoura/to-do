import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { tasksService } from ".."

export function useUpdateTask() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: tasksService.update,
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({
        queryKey: ["tasks", String(variables.id)],
      })

      const previousTask = context.client.getQueryData([
        "tasks",
        String(variables.id),
      ])

      context.client.setQueryData<Task>(
        ["tasks", String(variables.id)],
        variables
      )
      return { previousTask }
    },
    onSuccess: async () => {
      toast.success("Tarefa atualizada com sucesso")
    },
    onError: async (_, variables, onMutateResult, context) => {
      await context.client.cancelQueries({
        queryKey: ["tasks", String(variables.id)],
      })

      // Reverte a mutação (rollback)
      if (onMutateResult?.previousTask) {
        context.client.setQueryData(
          ["tasks", String(variables.id)],
          onMutateResult.previousTask
        )
      }
      toast.error("Erro ao atualizar tarefa")
    },
  })
  return { updateTask: mutateAsync, isPending }
}

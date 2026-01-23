import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { tasksService } from ".."

export function useDeleteTask() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: tasksService.delete,
    onMutate: async (variables, context) => {
      // Cancela queries em andamento
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      // Salva o estado anterior para rollback
      const previousTasks = context.client.getQueryData<Task[]>(["tasks"])

      // Optimistic update: remove a tarefa do cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter((task) => task.id !== variables)
      )

      return { previousTasks }
    },
    onSuccess: () => {
      toast.success("Tarefa Deletada com sucesso!")
    },
    onError: async (_error, _variables, onMutateResult, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks"] })
      // Rollback: restaura o estado anterior
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(["tasks"], onMutateResult.previousTasks)
      }
      toast.error("Erro ao deletar tarefa")
    },
  })
  return { deleteTask: mutateAsync, isDeleting: isPending }
}

import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { tasksService } from ".."

export function useDeleteTask(id: string) {
  return useMutation({
    mutationFn: () => tasksService.delete(id),
    onMutate: async (_, context) => {
      // Cancela queries em andamento
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      // Salva o estado anterior para rollback
      const previousTasks = context.client.getQueryData<Task[]>(["tasks"])

      // Optimistic update: remove a tarefa do cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter((task) => task.id !== id)
      )

      return { previousTasks }
    },
    onSuccess: (_result, _variables, __, context) => {
      // Invalidar queries para garantir sincronização com o servidor
      context.client.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Tarefa deletada com sucesso")
    },
    onError: (_error, _variables, onMutateResult, context) => {
      // Rollback: restaura o estado anterior
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(["tasks"], onMutateResult.previousTasks)
      }
      toast.error("Erro ao deletar tarefa")
    },
  })
}

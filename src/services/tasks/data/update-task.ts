import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { v4 } from "uuid"
import { tasksService } from ".."

export function useUpdateTask(task: Task) {
  return useMutation({
    mutationFn: (task: Task) => tasksService.update(task),
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks", task.id] })

      const previousTasks = context.client.getQueryData<Task[]>(["tasks"])
      const tmpId = v4()
      // Optimistic update: adiciona a tarefa no cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old.filter((task) => task.id !== variables.id),
        { ...variables, id: tmpId },
      ])
      return { tmpId, previousTasks }
    },
    onSuccess: async (result, _, onMutateResult, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks", task.id] })

      // atualiza o cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) => (task.id === onMutateResult?.tmpId ? result : task))
      )
      toast.success("Tarefa atualizada com sucesso")
    },
    onError: async (_, __, onMutateResult, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks", task.id] })

      // Reverte a mutação (rollback)
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(["tasks"], onMutateResult.previousTasks)
      }
      toast.error("Erro ao atualizar tarefa")
    },
  })
}

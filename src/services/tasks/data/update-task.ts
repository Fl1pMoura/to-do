import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { tasksService } from ".."

export function useUpdateTask(task: Task) {
  return useMutation({
    mutationFn: () => tasksService.update(task),
    onMutate: async (_, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks", task.id] })

      const previousTasks = context.client.getQueryData<Task[]>(["tasks"])

      const optimisticTask = {
        ...task,
      }
      // Optimistic update: adiciona a tarefa no cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old.filter((task) => task.id !== task.id),
        optimisticTask,
      ])
      return { optimisticTask, previousTasks }
    },
    onSuccess: (result, _, onMutateResult, context) => {
      // atualiza o cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === onMutateResult?.optimisticTask.id ? result : task
        )
      )
      toast.success("Tarefa atualizada com sucesso")
    },
    onError: (_, __, onMutateResult, context) => {
      // Reverte a mutação (rollback)
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(["tasks"], onMutateResult.previousTasks)
      }
      toast.error("Erro ao atualizar tarefa")
    },
  })
}

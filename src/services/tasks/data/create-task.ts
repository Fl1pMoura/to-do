import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { v4 } from "uuid"
import { tasksService } from ".."

export function useCreateTask(task: Task) {
  return useMutation({
    mutationFn: () => tasksService.create(task),
    onMutate: async (_, context) => {
      await context.client.cancelQueries({ queryKey: ["tasks"] })
      const optimisticTask = {
        id: v4(),
        title: "Nova tarefa",
        description: "Descrição da nova tarefa",
        tag: "morning",
        status: "not_started",
      }
      // optimistic update
      context.client.setQueryData(["tasks"], (old: Task[] = []) => [
        ...old,
        optimisticTask,
      ])
      return { optimisticTask }
    },
    onSuccess: (result, _, onMutateResult, context) => {
      // atualiza o cache
      context.client.setQueryData(["tasks"], (old: Task[] = []) =>
        old.map((task) =>
          task.id === onMutateResult.optimisticTask.id ? result : task
        )
      )
      toast.success("Tarefa criada com sucesso")
    },
    onError: (_, __, onMutateResult, context) => {
      // Reverte a mutação (rollback)
      context.client.setQueryData(["tasks"], (old: Task[] = []) =>
        old.filter((task) => task.id !== onMutateResult?.optimisticTask?.id)
      )
      toast.error("Erro ao criar tarefa")
    },
  })
}

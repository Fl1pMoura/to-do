import type { Task } from "@/entities/Task"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { v4 } from "uuid"
import { tasksService } from ".."

export function useCreateTask() {
  return useMutation({
    mutationFn: (task: Task) => tasksService.create(task),
    onMutate: async (task, context) => {
      // Cancela queries em andamento
      await context.client.cancelQueries({ queryKey: ["tasks"] })

      // Salva o estado anterior para rollback
      const previousTasks = context.client.getQueryData<Task[]>(["tasks"])

      // Cria tarefa otimista com os dados reais + ID temporário
      const optimisticTask: Task = {
        ...task,
        id: task.id || v4(), // usa o ID existente ou gera um temporário
      }

      // Optimistic update: adiciona a tarefa no cache
      context.client.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        optimisticTask,
      ])

      return { optimisticTask, previousTasks }
    },
    onSuccess: (result, _variables, onMutateResult, context) => {
      // Atualiza o cache com a resposta do servidor
      context.client.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === onMutateResult?.optimisticTask.id ? result : task
        )
      )
      toast.success("Tarefa criada com sucesso")
    },
    onError: (_error, _variables, onMutateResult, context) => {
      // Rollback: restaura o estado anterior
      if (onMutateResult?.previousTasks) {
        context.client.setQueryData(["tasks"], onMutateResult.previousTasks)
      }
      toast.error("Erro ao criar tarefa")
    },
  })
}

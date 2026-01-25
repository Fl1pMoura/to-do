import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Task } from "@/entities/Task"
import { PagesHeader } from "@/pages/components/Header"
import { PageSection, PageSectionContent } from "@/pages/components/PageSection"
import { useDeleteTask } from "@/services/tasks/data/delete-task"
import { useGetOneTask } from "@/services/tasks/data/get-one-task"
import { useUpdateTask } from "@/services/tasks/data/update-task"
import { queryKeys } from "@/services/tasks/query-keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"

import { Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { z } from "zod"

const updateTaskSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  tag: z.enum(["morning", "afternoon", "evening"]),
})

interface DetailsParams extends Record<string, string | undefined> {
  id: string
}

const TasksDetails = () => {
  const { id } = useParams<DetailsParams>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const task = queryClient.getQueryData<Task>(
    queryKeys.tasks.detail(String(id))
  )
  const { updateTask } = useUpdateTask()
  const { deleteTask } = useDeleteTask()
  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      description: task?.description,
      tag: task?.tag,
      title: task?.title,
    },
  })

  const { data } = useGetOneTask({
    id: id ?? "",
    reset: (data) => form.reset(data),
  })

  const onSubmit = async (values: z.infer<typeof updateTaskSchema>) => {
    updateTask({ ...data, ...values })
  }

  const onDelete = async () => {
    if (!id) {
      return
    }
    await deleteTask(id)
    navigate("/tasks")
  }
  return (
    <PageSection>
      <PagesHeader description="Início" title="Minhas Tarefas">
        <Button variant="destructive" onClick={onDelete}>
          <Trash2Icon className="size-4" />
          Deletar tarefa
        </Button>
      </PagesHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PageSectionContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Horário
                  </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Manhã</SelectItem>
                        <SelectItem value="afternoon">Tarde</SelectItem>
                        <SelectItem value="evening">Noite</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PageSectionContent>

          <Button type="submit" className="mt-9 ml-auto block">
            Salvar
          </Button>
        </form>
      </Form>
    </PageSection>
  )
}

export default TasksDetails

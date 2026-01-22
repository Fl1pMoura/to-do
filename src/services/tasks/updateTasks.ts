import type { Task } from "@/entities/Task"
import { httpClient } from "../httpClient"

export const updateTask = async (task: Task) => {
  const { data } = await httpClient.put<Task>(`/tasks/${task.id}`, task)
  return data ?? null
}

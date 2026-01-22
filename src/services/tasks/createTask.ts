import type { Task } from "@/entities/Task"
import { httpClient } from "../httpClient"

export const createTask = async (task: Task) => {
  const { data } = await httpClient.post<Task>("/tasks", task)
  return data ?? {}
}

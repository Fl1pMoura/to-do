import type { Task } from "@/entities/Task"
import { httpClient } from "../httpClient"

export const getAllTasks = async () => {
  const { data } = await httpClient.get<Task[]>("/tasks")
  return data ?? []
}

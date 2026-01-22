import type { Task } from "@/entities/Task"
import { httpClient } from "../httpClient"

export const getOneTask = async (id: string) => {
  const { data } = await httpClient.get<Task>(`/tasks/${id}`)
  return data ?? null
}

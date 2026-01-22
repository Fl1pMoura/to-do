import { httpClient } from "../httpClient"

export const deleteTask = async (id: string) => {
  await httpClient.delete(`/tasks/${id}`)
  return true
}

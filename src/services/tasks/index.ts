import { createTask } from "./createTask"
import { deleteTask } from "./deleteTask"
import { getAllTasks } from "./getAll"
import { getOneTask } from "./getOne"
import { updateTask } from "./updateTasks"

export const tasksService = {
  getAll: getAllTasks,
  getOne: getOneTask,
  delete: deleteTask,
  create: createTask,
  update: updateTask,
}

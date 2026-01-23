import DashboardLayout from "@/pages/layouts/DashboardLayout"
import Tasks from "@/pages/tasks"
import TaskDetails from "@/pages/tasks/details"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/home"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

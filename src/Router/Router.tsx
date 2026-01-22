import DashboardLayout from "@/pages/layouts/DashboardLayout"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/home"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

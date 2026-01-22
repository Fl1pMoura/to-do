import Aside from "@/components/Aside"
import { Outlet } from "react-router"

const DashboardLayout = () => {
  return (
    <section className="flex h-screen gap-8">
      <Aside />
      <Outlet />
    </section>
  )
}

export default DashboardLayout

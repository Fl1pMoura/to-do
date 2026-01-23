import Aside from "@/components/Aside"
import { Outlet } from "react-router"

const DashboardLayout = () => {
  return (
    <section className="flex h-screen">
      <Aside />
      <main className="ml-72 w-full">
        <Outlet />
      </main>
    </section>
  )
}

export default DashboardLayout

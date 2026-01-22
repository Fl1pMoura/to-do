export interface Task {
  id?: number | string
  title: string
  description: string
  tag: "morning" | "afternoon" | "evening"
  status?: "not_started" | "in_progress" | "completed"
}

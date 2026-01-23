export type WithQueryStatus<T> = T & {
  queryStatus: "pending" | "success" | "error"
}

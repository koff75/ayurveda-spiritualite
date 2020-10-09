import { TodoStoreModel, TodoStore } from "./todo-store"

test("can be created", () => {
  const instance: TodoStore = TodoStoreModel.create({})

  expect(instance).toBeTruthy()
})
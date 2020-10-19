import {
  Instance,
  SnapshotOut,
  types,
  getRoot,
  destroy,
  getSnapshot,
  flow,
  applySnapshot,
} from "mobx-state-tree"

export const SHOW_ALL = "show_all"
export const SHOW_COMPLETED = "show_completed"
export const SHOW_ACTIVE = "show_active"

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal))
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo) => todo.completed,
}

const Todo = types
  .model({
    text: types.string,
    completed: false,
    id: types.identifierNumber,
  })
  .actions((self) => ({
    remove() {
      getRoot(self).removeTodo(self)
    },
    edit(text) {
      self.text = text
    },
    complete() {
      self.completed = !self.completed
    },
  }))

/**
 * Model description here for TypeScript hints.
 */
export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todos: types.array(Todo),
    filter: types.optional(filterType, SHOW_ALL),
  })
  .views((self) => ({
    get completedCount() {
      return self.todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
    },
    get activeCount() {
      return self.todos.length - self.completedCount
    },
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[self.filter])
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // actions
    addTodo(text) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      self.todos.unshift({
        id,
        text,
      })
    },
    removeTodo: flow(function* (todo) {
      // Si connexion à un serveur alors uncomment
      // const oldTodos = getSnapshot(self.todos)
      destroy(todo) // optimistic update
      // try {
      //   yield deleteTodo(todo)
      // } catch (error) {
      //   // Rollback if DELETE request fails
      //   applySnapshot(self.todos, oldTodos)
      //   alert(`${error.message}. Please try again.`)
      // }
    }),
    completeAll() {
      const areAllMarked = self.todos.every((todo) => todo.completed)
      self.todos.forEach((todo) => (todo.completed = !areAllMarked))
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter((todo) => todo.completed === false))
    },
    setFilter(filter) {
      self.filter = filter
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TodoStoreType = Instance<typeof TodoStoreModel>
export interface TodoStore extends TodoStoreType {}
type TodoStoreSnapshotType = SnapshotOut<typeof TodoStoreModel>
export interface TodoStoreSnapshot extends TodoStoreSnapshotType {}

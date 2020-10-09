import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const TodoStoreModel = types
  .model("TodoStore")
  .props({})
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

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

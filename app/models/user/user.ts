import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    // Defined by firebase auth
    uid: types.maybe(types.string),
    displayName: types.maybe(types.string),
    email: types.maybe(types.string),
    emailVerified: types.maybe(types.string),
    photoURL: types.maybe(types.string),
    providerId: types.maybe(types.string),
    isLoggedIn: types.maybe(types.boolean),
    name: types.maybe(types.string),
    action: types.maybe(types.string),
    // +... metrics: types.maybe(UserMetricsModel),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}

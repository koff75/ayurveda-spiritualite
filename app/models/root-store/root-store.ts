import { UserStoreModel } from "../user-store/user-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { auth } from "../../components/base-components/Firebase"

// ------------
// export const User = types.model("User", {
//   id: types.identifier,
//   name: types.string,
//   email: types.string,
// })
// ------------

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    userStore: types.optional(UserStoreModel, {}),
    uid2: types.optional(types.string, "1"),
  })
  .actions((self) => ({
    isSignout: () => {
      console.log("PASSAGE ACTION 2")
      const res = true
      if (res) return true
      else return false
    },
  }))
  .actions((self) => ({
    setUser: (authUser) => {
      console.log("Action1 -> setUser")
      if (authUser === null) self.uid2 = "1"
      else self.uid2 = authUser
      // console.log(authUser.providerData[0].email)
      // console.log(JSON.stringify(authUser))

      // user
    },
    setIsLoading: (res) => {
      console.log(`Action -> setIsLoading : ${res}`)
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

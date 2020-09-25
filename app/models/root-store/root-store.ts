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
    User: types.optional(types.string, "Default"),
  })
  .actions((self) => ({
    firebaseAuth: () => {
      console.log("Action -> isSignedIn - pour déterminer la route")
      // onAuthStateChanged returns an unsubscriber
      self.setIsLoading(true)
      const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
        try {
          await (authUser ? self.setUser(authUser) : self.setUser(null))
          self.setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      })

      // unsubscribe auth listener on unmount
      return unsubscribeAuth
      /* ---- */
      console.log("PASSAGE ACTION 1")
      return true
    },
    isSignout: () => {
      console.log("PASSAGE ACTION 2")
      const res = "self.user.email"
      if (res) return true
      else return false
    },
  }))
  .actions((self) => ({
    setUser: (authUser) => {
      console.log("Action1 -> setUser")
      self.User.email = authUser.providerData[0].email
      console.log(authUser.providerData[0].email)
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

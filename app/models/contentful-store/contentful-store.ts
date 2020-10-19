import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions"

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

/**
 * Model description here for TypeScript hints.
 */
export const ContentfulStoreModel = types
  .model("ContentfulStore")
  .props({
    status: types.optional(types.enumeration(["pending", "done", "error"]), "done"),
    // meditationCourse: types.optional(types.array(meditationCourseModel), []),
    // learningCourse: types.optional(types.array(learningCourseModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    // subscribe: () => {},
    // load: (talks: MeditationCourseSnapshot[], settings: LearningCourseSnapshot[]) => {
    //   elf.meditationCourse.replace(meditationCourse as any)
    //   self.learningCourse.replace(learningCourse as any)
    // },
  }))
  .actions((self) => ({
    getMeditateCourse: flow(function* () {
      console.log("=============ACTION")

      self.status = "pending"
      try {
        const result = yield self.environment.graphql.query({
          fetchPolicy: "network-only",
          query: gql`
            {
              meditateCourseCollection {
                items {
                  title
                  description
                  subtitle
                  cover {
                    url
                    size
                    width
                    height
                    contentType
                  }
                  author {
                    name
                    photo {
                      url
                      size
                      width
                      height
                    }
                  }
                  lessonsCollection {
                    items {
                      title
                      duration
                      permission
                      videoLink
                    }
                  }
                }
              }
            }
          `,
        })
        if (result.data) {
          self.status = "done"
          return console.log(result.data)
          // self.load(
          //   result.data.meditateCourseCollection.items,
          //   result.data.learningCourseCollection.items,
          // )
        } else {
          self.status = "error"
        }
      } catch (e) {
        __DEV__ && console.tron.log(e)
      }
    }),
  }))
// .views((self) => ({
//   get sortedTalks() {
//     return self.talks.sort(
//       (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
//     )
//   },
//   get discussionsEnabled() {
//     try {
//       return self.settings.length > 0
//         ? self.settings.find((s) => s.name === "discussions_enabled").value
//         : false
//     } catch (error) {
//       __DEV__ && console.tron.log(error.message)
//       return false
//     }
//   },
// }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

// export const defaults = {}
// export const createTalkStoreModel = () => types.optional(TalkStoreModel, defaults as any) // Using any because https://github.com/mobxjs/mobx-state-tree/issues/1307

type ContentfulStoreType = Instance<typeof ContentfulStoreModel>
export interface ContentfulStore extends ContentfulStoreType {}
type ContentfulStoreSnapshotType = SnapshotOut<typeof ContentfulStoreModel>
export interface ContentfulStoreSnapshot extends ContentfulStoreSnapshotType {}

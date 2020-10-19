import { ContentfulStoreModel, ContentfulStore } from "./contentful-store"

test("can be created", () => {
  const instance: ContentfulStore = ContentfulStoreModel.create({})

  expect(instance).toBeTruthy()
})
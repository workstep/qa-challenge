process.env.NODE_ENV = "test"

import { loadEnvConfig } from "@blitzjs/env"
loadEnvConfig()

import "./register-ts-paths"
import db from "db"
import seed from "db/seeds"

let dbSetup = false

const pluginConfig: Cypress.PluginConfig = (on, _config) => {
  on("task", {
    "db:reset": async () => {
      if (!dbSetup) {
        try {
          // Only need to do this once at startup
          console.log("Resetting database...")
          await db.$reset()
          console.log("Database reset.")
          dbSetup = true
        } catch (error) {
          console.error(error)
          throw new Error("Failed to set up database in cypress/plugins/index.ts")
        }
      }
      return true
    },
    "db:seed": async () => {
      await seed()
      return true
    },
  })
}
export default pluginConfig

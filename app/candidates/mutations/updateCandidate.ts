import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCandidate = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateCandidate), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const candidate = await db.candidate.update({ where: { id }, data })

  return candidate
})

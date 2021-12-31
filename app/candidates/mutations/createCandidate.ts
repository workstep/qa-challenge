import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCandidate = z.object({
  name: z.string(),
  interviewed_at: z.date(),
  step: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCandidate), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const candidate = await db.candidate.create({ data: input })

  return candidate
})

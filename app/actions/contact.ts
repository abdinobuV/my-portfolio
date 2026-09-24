"use server"

import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
})

export type ContactState = {
  success: boolean
  error?: string
}

export async function submitContact(
  values: z.infer<typeof schema>
): Promise<ContactState> {
  const parsed = schema.safeParse(values)

  if (!parsed.success) {
    return { success: false, error: "Input tidak valid. Periksa lagi isian Anda." }
  }

  // Placeholder: log saja dulu. Ganti dengan Resend/EmailJS di produksi.
  console.log("[contact]", {
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    at: new Date().toISOString(),
  })

  await new Promise((resolve) => setTimeout(resolve, 600))

  return { success: true }
}

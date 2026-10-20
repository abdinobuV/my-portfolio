"use server"

import { contactSchema, sendContactMessage, type ContactState } from "@/lib/contact"

export async function submitContact(values: unknown): Promise<ContactState> {
  const parsed = contactSchema.safeParse(values)

  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return {
      success: false,
      error: first?.message ?? "Input tidak valid. Periksa lagi isian Anda.",
    }
  }

  const transport = await sendContactMessage(parsed.data)

  if (!transport.sent) {
    return { success: false, error: transport.error }
  }

  return { success: true }
}

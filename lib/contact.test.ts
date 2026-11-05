import { describe, expect, it } from "vitest"

import { contactSchema, sendContactMessage } from "@/lib/contact"

const valid = {
  name: "Budi Santoso",
  email: "budi@example.com",
  message: "Halo, saya tertarik dengan portofolio Anda.",
}

describe("contactSchema", () => {
  it("menerima isian yang valid", () => {
    const parsed = contactSchema.safeParse(valid)
    expect(parsed.success).toBe(true)
  })

  it("menolak nama terlalu pendek", () => {
    const parsed = contactSchema.safeParse({ ...valid, name: "B" })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toBe("Nama minimal 2 karakter")
    }
  })

  it("menolak email yang tidak valid", () => {
    const parsed = contactSchema.safeParse({ ...valid, email: "bukan-email" })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toBe("Masukkan email yang valid")
    }
  })

  it("menolak pesan yang terlalu pendek", () => {
    const parsed = contactSchema.safeParse({ ...valid, message: "halo" })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toBe("Pesan minimal 10 karakter")
    }
  })

  it("menolak pesan yang terlalu panjang", () => {
    const parsed = contactSchema.safeParse({
      ...valid,
      message: "a".repeat(2001),
    })
    expect(parsed.success).toBe(false)
    if (!parsed.success) {
      expect(parsed.error.issues[0].message).toBe("Pesan maksimal 2000 karakter")
    }
  })
})

describe("sendContactMessage", () => {
  it("tidak pernah melaporkan terkirim sebelum ada transport", async () => {
    const result = await sendContactMessage(valid, { apiKey: "" })
    expect(result.sent).toBe(false)
    if (!result.sent) {
      expect(result.error).toMatch(/belum aktif/i)
    }
  })

  it("mengirim pesan ke Resend saat apiKey tersedia dan respons 200", async () => {
    let capturedUrl = ""
    let capturedInit: RequestInit | undefined
    const mockFetch: typeof fetch = async (input, init) => {
      capturedUrl = String(input)
      capturedInit = init
      return new Response(JSON.stringify({ id: "email_123" }), { status: 200 })
    }

    const result = await sendContactMessage(valid, {
      apiKey: "re_test_key",
      toEmail: "tujuan@example.com",
      fromEmail: "pengirim@example.com",
      fetchImpl: mockFetch,
    })

    expect(result).toEqual({ sent: true })
    expect(capturedUrl).toBe("https://api.resend.com/emails")
    expect(capturedInit?.method).toBe("POST")
    const body = JSON.parse(String(capturedInit?.body))
    expect(body.to).toEqual(["tujuan@example.com"])
    expect(body.reply_to).toBe(valid.email)
  })

  it("melaporkan kegagalan dengan jujur saat Resend mengembalikan status error", async () => {
    const mockFetch: typeof fetch = async () =>
      new Response("Unauthorized", { status: 401 })

    const result = await sendContactMessage(valid, {
      apiKey: "re_invalid",
      fetchImpl: mockFetch,
    })

    expect(result.sent).toBe(false)
    if (!result.sent) {
      expect(result.error).toMatch(/gagal mengirim/i)
    }
  })
})

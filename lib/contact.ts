import { z } from "zod"

/**
 * Satu sumber validasi untuk form kontak — dipakai bersama oleh komponen
 * client dan server action agar pesan error yang tampil sama persis.
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Masukkan email yang valid"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
})

export type ContactValues = z.infer<typeof contactSchema>

export type ContactState = {
  success: boolean
  error?: string
}

export type ContactTransport =
  | { sent: true }
  | { sent: false; error: string }

export type ContactEnv = {
  apiKey?: string
  toEmail?: string
  fromEmail?: string
  fetchImpl?: typeof fetch
}

const DEFAULT_TO_EMAIL = "abdi.raihan.wibowo@gmail.com"
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>"

/**
 * Mengirim pesan ke kotak masuk melalui Resend API bila `RESEND_API_KEY`
 * tersedia. Tanpa kunci API, fungsi ini selalu menolak dengan pesan yang jujur.
 *
 * Form hanya menampilkan layar "Pesan terkirim" bila fungsi ini benar-benar
 * mengembalikan `sent: true`.
 */
export async function sendContactMessage(
  values: ContactValues,
  env: ContactEnv = {}
): Promise<ContactTransport> {
  const apiKey = (env.apiKey ?? process.env.RESEND_API_KEY ?? "").trim()
  if (!apiKey) {
    return {
      sent: false,
      error:
        "Form belum aktif. Untuk sekarang, kirim pesan langsung ke email atau LinkedIn saya.",
    }
  }

  const toEmail =
    (env.toEmail ?? process.env.CONTACT_TO_EMAIL ?? "").trim() ||
    DEFAULT_TO_EMAIL
  const fromEmail =
    (env.fromEmail ?? process.env.CONTACT_FROM_EMAIL ?? "").trim() ||
    DEFAULT_FROM_EMAIL
  const fetchFn = env.fetchImpl ?? fetch

  try {
    const response = await fetchFn("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: values.email,
        subject: `[Portfolio] Pesan baru dari ${values.name}`,
        text: [
          `Nama: ${values.name}`,
          `Email: ${values.email}`,
          "",
          "Pesan:",
          values.message,
        ].join("\n"),
      }),
    })

    if (!response.ok) {
      return {
        sent: false,
        error:
          "Gagal mengirim pesan lewat layanan email. Silakan hubungi langsung melalui email atau LinkedIn.",
      }
    }

    return { sent: true }
  } catch {
    return {
      sent: false,
      error:
        "Koneksi ke layanan email terputus. Silakan coba lagi atau kirim email langsung.",
    }
  }
}

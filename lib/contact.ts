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

/**
 * Mengirim pesan ke kotak masuk. Saat ini belum ada layanan email yang
 * terhubung, jadi fungsi ini selalu menolak dengan pesan yang jujur.
 *
 * Form hanya menampilkan layar "Pesan terkirim" bila fungsi ini benar-benar
 * mengembalikan `sent: true` — begitulah form tahu apa yang harus ditampilkan.
 */
export async function sendContactMessage(
  _values: ContactValues
): Promise<ContactTransport> {
  return {
    sent: false,
    error:
      "Form belum aktif. Untuk sekarang, kirim pesan langsung ke email atau LinkedIn saya.",
  }
}

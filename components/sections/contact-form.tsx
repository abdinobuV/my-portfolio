"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2Icon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Confetti } from "@/components/animations/confetti"
import { submitContact, type ContactState } from "@/app/actions/contact"

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Masukkan email yang valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

type FormValues = z.infer<typeof schema>

function ContactForm() {
  const [state, setState] = React.useState<ContactState | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(values: FormValues) {
    const result = await submitContact(values)
    setState(result)
    if (result.success) reset()
  }

  if (state?.success) {
    return (
      <div
        role="status"
        className="relative flex h-full min-h-64 flex-col items-start justify-center overflow-visible border border-border p-8"
      >
        <Confetti className="top-6 left-6" />
        <CheckCircle2Icon className="size-8" aria-hidden />
        <p className="font-heading mt-4 text-lg font-semibold tracking-wide">
          Pesan terkirim
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Terima kasih! Saya akan membalas secepatnya.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setState(null)}
        >
          Kirim lagi
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 border border-border p-5 md:p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          autoComplete="name"
          placeholder="Nama lengkap"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="text-xs text-destructive">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tulis pesan Anda…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {state && !state.success && state.error ? (
        <p role="alert" className="text-xs text-destructive">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" aria-hidden />
            Mengirim…
          </>
        ) : (
          "Kirim pesan"
        )}
      </Button>
    </form>
  )
}

export { ContactForm }

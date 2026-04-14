'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { submitSampleRequest } from '@/app/actions/submit-sample-request'
import type { FormState } from '@/app/actions/submit-manager-request'
import { FormField } from '@/components/forms/FormField'
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Анкета для образца. PDF §2.8. Отображается только на странице
 * «Стикеры с контурной резкой» (флаг `features.sampleForm` в контенте).
 */
const initialState: FormState = { ok: false }

export function SampleRequestForm() {
  const [state, formAction] = useFormState(submitSampleRequest, initialState)

  if (state.ok) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl  bg-yellow p-8 text-yellow-ink shadow-soft-lg">
        <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
        <h3 className="text-display-sm font-display uppercase">Образец в пути!</h3>
        <p className="text-sm">
          Спасибо! Мы свяжемся с вами в ближайшее время, чтобы уточнить адрес и отправить
          бесплатный образец нашей продукции.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <FormField label="Имя" htmlFor="sr-name" required error={state.fieldErrors?.name}>
        <Input
          id="sr-name"
          name="name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          required
          invalid={Boolean(state.fieldErrors?.name)}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Почта" htmlFor="sr-email" required error={state.fieldErrors?.email}>
          <Input
            id="sr-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.ru"
            required
            invalid={Boolean(state.fieldErrors?.email)}
          />
        </FormField>
        <FormField label="Телефон" htmlFor="sr-phone" required error={state.fieldErrors?.phone}>
          <Input
            id="sr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 (921) 000-00-00"
            required
            invalid={Boolean(state.fieldErrors?.phone)}
          />
        </FormField>
      </div>

      <FormField
        label="Комментарий"
        htmlFor="sr-comment"
        hint="Необязательно — можно указать желаемые материалы, форматы или сроки"
        error={state.fieldErrors?.comment}
      >
        <Textarea
          id="sr-comment"
          name="comment"
          rows={4}
          placeholder="Что конкретно вас интересует?"
          invalid={Boolean(state.fieldErrors?.comment)}
        />
      </FormField>

      <ConsentCheckbox id="sr-consent" />

      {state.error && !state.fieldErrors ? (
        <p className="text-sm text-red" role="alert">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <StickerButton type="submit" size="lg" tone="yellow" disabled={pending}>
      {pending ? 'Отправляем…' : 'Заказать бесплатный образец'}
      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
    </StickerButton>
  )
}

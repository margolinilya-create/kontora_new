'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { submitManagerRequest, type FormState } from '@/app/actions/submit-manager-request'
import { home } from '@/lib/content/home'
import { FormField } from '@/components/forms/FormField'
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Форма «Запрос для менеджера» с Server Action.
 * Progressive enhancement: работает без JS — браузер шлёт FormData напрямую.
 * React 19 `useActionState` для inline ошибок и success state.
 *
 * TODO(M5): реальная отправка через Resend + Telegram в submitManagerRequest.
 */
const initialState: FormState = { ok: false }

export function ManagerRequestForm() {
  const [state, formAction] = useFormState(submitManagerRequest, initialState)

  if (state.ok) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border-2 border-dark bg-yellow p-8 text-yellow-ink shadow-sticker-lg">
        <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
        <h3 className="text-display-sm font-display uppercase">Заявка ушла!</h3>
        <p className="text-sm">
          Менеджер свяжется с вами в рабочее время (пн–пт, 10:00–19:00 МСК). Проверьте почту — туда
          тоже придёт копия.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <FormField label="Имя или компания" htmlFor="mr-name" required error={state.fieldErrors?.name}>
        <Input
          id="mr-name"
          name="name"
          autoComplete="name"
          placeholder="Иван / ООО «Ромашка»"
          required
          invalid={Boolean(state.fieldErrors?.name)}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Почта" htmlFor="mr-email" required error={state.fieldErrors?.email}>
          <Input
            id="mr-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.ru"
            required
            invalid={Boolean(state.fieldErrors?.email)}
          />
        </FormField>
        <FormField label="Телефон" htmlFor="mr-phone" required error={state.fieldErrors?.phone}>
          <Input
            id="mr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 (921) 000-00-00"
            required
            invalid={Boolean(state.fieldErrors?.phone)}
          />
        </FormField>
      </div>

      <FormField label="Продукция" htmlFor="mr-product" required error={state.fieldErrors?.product}>
        <Select
          id="mr-product"
          name="product"
          required
          defaultValue=""
          placeholder="Что нужно напечатать?"
          options={home.managerRequest.productOptions}
          invalid={Boolean(state.fieldErrors?.product)}
        />
      </FormField>

      <ConsentCheckbox />

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
      {pending ? 'Отправляем…' : 'Отправить заявку'}
      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
    </StickerButton>
  )
}

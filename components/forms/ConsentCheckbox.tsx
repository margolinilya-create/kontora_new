import Link from 'next/link'
import { Checkbox } from '@/components/ui/Checkbox'

/**
 * 152-ФЗ consent checkbox для всех форм сайта.
 * Обязателен: submit заблокирован без галочки на стороне формы + Server
 * Action отклоняет submit без `consent` в payload.
 */
type ConsentCheckboxProps = {
  id?: string
  name?: string
  defaultChecked?: boolean
}

export function ConsentCheckbox({ id = 'consent', name = 'consent', defaultChecked }: ConsentCheckboxProps) {
  return (
    <Checkbox
      id={id}
      name={name}
      defaultChecked={defaultChecked}
      required
      label={
        <span>
          Я согласен на обработку персональных данных согласно{' '}
          <Link href="/privacy" className="underline decoration-yellow underline-offset-2 hover:text-yellow">
            политике конфиденциальности
          </Link>{' '}
          и{' '}
          <Link href="/soglasie" className="underline decoration-yellow underline-offset-2 hover:text-yellow">
            согласию
          </Link>
          .
        </span>
      }
    />
  )
}

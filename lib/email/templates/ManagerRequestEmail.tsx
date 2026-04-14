import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'

/**
 * React Email шаблон для уведомления о заявке «Запрос менеджера».
 * Простой одностраничный lay­out в брендовой стилистике.
 */
type Props = {
  name: string
  email: string
  phone: string
  product: string
  receivedAt: string
}

export function ManagerRequestEmail({ name, email, phone, product, receivedAt }: Props) {
  return (
    <Html lang="ru">
      <Head />
      <Preview>Новая заявка от {name} — {product}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Новая заявка с сайта</Heading>
          <Text style={mutedStyle}>Получена {receivedAt}</Text>

          <Section style={cardStyle}>
            <Row label="Имя / компания" value={name} />
            <Row label="Почта" value={email} />
            <Row label="Телефон" value={phone} />
            <Row label="Продукт" value={product} />
          </Section>

          <Text style={footerStyle}>
            Kontora — мануфактура виниловых изделий. Санкт-Петербург, ул. Набережная канала
            Грибоедова, 126.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee' }}>
      <Text style={rowLabelStyle}>{label}</Text>
      <Text style={rowValueStyle}>{value}</Text>
    </Section>
  )
}

const bodyStyle = {
  backgroundColor: '#fafaf7',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  margin: 0,
  padding: '24px 0',
}

const containerStyle = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '14px',
  border: '2px solid #0f0f0f',
  boxShadow: '6px 6px 0 0 #0f0f0f',
}

const headingStyle = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 800,
  color: '#0f0f0f',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.01em',
}

const mutedStyle = {
  margin: '8px 0 24px',
  color: '#666666',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
}

const cardStyle = {
  backgroundColor: '#ffd047',
  border: '2px solid #0f0f0f',
  borderRadius: '12px',
  padding: '8px 20px',
  marginBottom: '24px',
}

const rowLabelStyle = {
  margin: 0,
  color: '#1a1400',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  fontWeight: 700,
  opacity: 0.7,
}

const rowValueStyle = {
  margin: '4px 0 0',
  color: '#0f0f0f',
  fontSize: '16px',
  fontWeight: 600,
}

const footerStyle = {
  margin: '24px 0 0',
  fontSize: '12px',
  color: '#999999',
  textAlign: 'center' as const,
  lineHeight: '1.5',
}

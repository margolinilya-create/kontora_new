import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'

type Props = {
  name: string
  email: string
  phone: string
  comment?: string
  receivedAt: string
}

export function SampleRequestEmail({ name, email, phone, comment, receivedAt }: Props) {
  return (
    <Html lang="ru">
      <Head />
      <Preview>Запрос образца от {name}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Запрос образца</Heading>
          <Text style={mutedStyle}>Получен {receivedAt}</Text>

          <Section style={cardStyle}>
            <Row label="Имя" value={name} />
            <Row label="Почта" value={email} />
            <Row label="Телефон" value={phone} />
            {comment ? <Row label="Комментарий" value={comment} /> : null}
          </Section>

          <Text style={footerStyle}>
            Не забудь уточнить адрес доставки и отправить набор сэмплов.
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
}

const mutedStyle = {
  margin: '8px 0 24px',
  color: '#666666',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
}

const cardStyle = {
  backgroundColor: '#7c4dff',
  border: '2px solid #0f0f0f',
  borderRadius: '12px',
  padding: '8px 20px',
  marginBottom: '24px',
}

const rowLabelStyle = {
  margin: 0,
  color: '#ffffff',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  fontWeight: 700,
  opacity: 0.7,
}

const rowValueStyle = {
  margin: '4px 0 0',
  color: '#ffffff',
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

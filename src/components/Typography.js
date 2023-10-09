import { styled } from 'styled-components'

const Typography = ({
  children = '',
  color = '#000',
  fontSize = 16,
  fontWeight = 'regular',
  isA = false,
}) => {
  return isA ? (
    <CText1 style={{ color, fontSize, fontWeight }}>{children}</CText1>
  ) : (
    <CText2 style={{ color, fontSize, fontWeight }}>{children}</CText2>
  )
}

const CText1 = styled.span`
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 4px;
`
const CText2 = styled.span``

export default Typography

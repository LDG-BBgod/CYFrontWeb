import { gray6 } from '../common'
import Typography from './Typography'

const CYButton2 = ({
  buttonFunc = null,
  text = null,
  width = '100%',
  height = '30px',
  fontSize = '16px',
}) => {
  return (
    <button
      onClick={buttonFunc}
      style={{
        boxSizing: 'border-box',
        width,
        height,
        border: 'none',
        background: gray6,
        borderRadius: 10,
        cursor: 'pointer',
      }}
    >
      <Typography fontSize={fontSize} color="#fff" fontWeight="bold">
        {text}
      </Typography>
    </button>
  )
}
export default CYButton2

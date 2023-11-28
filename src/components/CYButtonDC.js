import { gray6 } from '../common'
import Typography from './Typography'

const CYButtonDC = ({
  buttonFunc = null,
  text = null,
  width = '100%',
  height = '30px',
  fontSize = '16px',
  backgroudColor = '#fff',
  color = '#000',
}) => {
  return (
    <button
      onClick={buttonFunc}
      style={{
        boxSizing: 'border-box',
        width,
        height,
        border: 'none',
        background: {backgroudColor},
        borderRadius: 10,
        cursor: 'pointer',
      }}
    >
      <Typography fontSize={fontSize} color={color} fontWeight="bold">
        {text}
      </Typography>
    </button>
  )
}
export default CYButtonDC

import { useState, useRef } from 'react'
import { styled } from 'styled-components'
import Spacer from './Spacer.js.js'
import Typography from './Typography.js'
import { gray1, green, lightBlue } from '../common.js'

const CYInput2 = ({
  title,
  type = 'default',
  placeholer = '',
  onValueChange,
  value
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.focus()
    setIsFocused(true)
  }

  const handleBlur = () => {
    inputRef.current.blur()
    setIsFocused(false)
  }

  const handleValueChange = (e) => {
    onValueChange(e.target.value)
  }

  return (
    <CBox>
      <Typography fontSize={20} color={green} fontWeight="bold">
        {title}
      </Typography>
      <Spacer space={12} />
      <input
        style={{
          boxSizing: 'border-box',
          width: '100%',
          height: 35,
          lineHeight: 35,
          padding: 10,
          border: isFocused ? `solid 1px ${green}` : `solid 1px ${gray1}`,
          borderRadius: 10,
          fontSize: 14,
          backgroundColor: lightBlue
        }}
        value={value}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        placeholder={placeholer}
        onChange={handleValueChange}
      />
    </CBox>
  )
}

export default CYInput2

const CBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`

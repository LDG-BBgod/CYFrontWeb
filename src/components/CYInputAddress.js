import { useState, useRef } from 'react'
import { styled } from 'styled-components'
import Spacer from './Spacer.js'
import Typography from './Typography.js'
import { gray1, green, lightBlue, white, black } from '../common.js'

const CYInputAddress = ({
  title,
  onValueChange,
  value1,
  value2,
  value3,
  onClick,
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
      <Typography fontSize={20} color={black} fontWeight="bold">
        {title}
      </Typography>
      <Spacer space={12} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          readOnly
          style={{
            boxSizing: 'border-box',
            width: 150,
            height: 35,
            lineHeight: 35,
            padding: 10,
            border: `solid 1px ${gray1}`,
            borderRadius: 10,
            fontSize: 14,
            backgroundColor: lightBlue,
          }}
          value={value1}
          placeholder={'우편번호'}
        />
        <Spacer horizontal={false} space={10} />
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            border: 'none',
            width: 100,
            height: 35,
            padding: 10,
            borderRadius: 10,
            fontSize: 14,
            color: `${white}`,
            background: `${green}`,
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          주소찾기
        </button>
      </div>
      <Spacer space={10} />
      <input
        readOnly
        style={{
          boxSizing: 'border-box',
          width: '100%',
          height: 35,
          lineHeight: 35,
          padding: 10,
          border: `solid 1px ${gray1}`,
          borderRadius: 10,
          fontSize: 14,
          backgroundColor: lightBlue,
        }}
        value={value2}
        placeholder={'주소'}
      />
      <Spacer space={10} />
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
          backgroundColor: lightBlue,
        }}
        value={value3}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={'상세주소'}
        onChange={handleValueChange}
      />
    </CBox>
  )
}

export default CYInputAddress

const CBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`

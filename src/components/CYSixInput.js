import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'

const CYSixInput = ({ onDigitsChange }) => {
  const inputRefs = useRef([])
  const [digits, setDigits] = useState(Array(6).fill(''))

  useEffect(() => {
    onDigitsChange(digits)
  }, [digits])

  const handleChange = (index, text) => {
    if (text.length <= 1) {
      const newDigits = [...digits]
      newDigits[index] = text
      setDigits(newDigits)

      if (text.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  return (
    <CBox>
      {digits.map((digit, index) => (
        <CInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          maxLength={1}
          type="text"
          pattern="[0-9]*"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </CBox>
  )
}

export default CYSixInput

const CBox = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'space-between';
`

const CInput = styled.input`
  text-align: center;
  width: 60px;
  height: 80px;
  margin: 0 15px;
  font-size: 40px;
  border-radius: 5px;
  border: solid 1px #707070;
`

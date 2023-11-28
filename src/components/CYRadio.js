import { useState } from 'react'
import { styled } from 'styled-components'
import { green } from '../common'

const CYRadio = ({ options, onChange, setData, data }) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleOptionChange = (event) => {
    const value = event.target.value
    setSelectedOption(value)
    onChange(value)
    const newData = {
      ...data,
      timeSection: value
    }
    setData(newData)
  }

  return (
    <div style={{display: 'flex', gap: 40}}>
      {options.map((option) => (
        <CLabel key={option}>
          <CInput
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          {option}
        </CLabel>
      ))}
    </div>
  )
}

export default CYRadio

const CLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`

const CInput = styled.input`
  margin: 0 8px 0 0;
  padding: 0;
  appearance: none;
  width: 18px;
  height: 18px;
  cursor: pointer;

  &:checked {
    background: center url('/img/checked.svg') no-repeat;
    border: none;
  }

  &:not(:checked) {
    background: center url('/img/unChecked.svg') no-repeat;
  }
`

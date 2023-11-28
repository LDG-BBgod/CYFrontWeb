import { useState } from 'react'
import { styled } from 'styled-components'
import { gray2, green } from '../common'

const CYCheckbox = ({ label, dataType, setData, data }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleOptionChange = (event) => {
    const newData = {
      ...data,
      [dataType]: !isChecked,
    }
    setData(newData)
    setIsChecked(!isChecked)
  }

  return (
    <div style={{ display: 'flex', gap: 40 }}>
      <CLabel>
        <CInput type="checkbox" onChange={handleOptionChange} />
        <span style={{ color: isChecked ? '#000' : gray2 }}>{label}</span>
      </CLabel>
    </div>
  )
}

export default CYCheckbox

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
    background: center url('/img/unChecked2.svg') no-repeat;
  }
`

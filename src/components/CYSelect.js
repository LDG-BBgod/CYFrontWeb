// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
// action

// api

// components
import Spacer from './Spacer.js'
// common
import { gray1, green, lightBlue, black } from '../common.js'

const CYSelect = ({ optionData, setData, data }) => {
  const [currentValue, setCurrentValue] = useState('종류선택')
  const [showOptions, setShowOptions] = useState('none')

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute('value'))
    setData({ ...data, licenseType: e.target.getAttribute('value') })
  }
  return (
    <div>
      <SelectBox
        onClick={() => {
          showOptions === 'none'
            ? setShowOptions('block')
            : setShowOptions('none')
        }}
      >
        <Label>{currentValue}</Label>
        <SelectOptions style={{ display: showOptions }}>
          {optionData.map((value, key) => (
            <Option key={key} value={value} onClick={handleOnChangeSelectValue}>
              {value}
            </Option>
          ))}
        </SelectOptions>
      </SelectBox>
    </div>
  )
}

export default CYSelect

const SelectBox = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 200px;
  height: 35px;
  border-radius: 10px;
  border: solid 1px ${gray1};
  background-color: ${lightBlue};
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 3px;
    right: 8px;
    color: #000;
    font-weight: bold;
    font-size: 20px;
  }
`
const Label = styled.label`
  font-size: 14px;
  text-align: center;
`
const SelectOptions = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  list-style: none;
  top: 34px;
  left: 0;
  width: 100%;
  overflow: hidden;
  border: solid 1px ${gray1};
  border-radius: 10px;
  background-color: ${lightBlue};
`
const Option = styled.div`
  padding-left: 8px;
  box-sizing: border-box;
  font-size: 14px;
  color: ${black};
  height: 35px;
  line-height: 35px;
`

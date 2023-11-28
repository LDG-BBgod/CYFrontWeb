// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
// action

// api

// components
import Spacer from './Spacer.js'
// common
import { gray1, green, lightBlue, black, white } from '../common.js'

const CYSelect2 = ({ optionData, setData, data, dataType }) => {
  const [currentValue, setCurrentValue] = useState(optionData[0])
  const [showOptions, setShowOptions] = useState('none')

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute('value'))
    const newData = {
      ...data,
      [dataType]: e.target.getAttribute('value'),
    }
    setData(newData)
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

export default CYSelect2

const SelectBox = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: solid 1px ${gray1};
  background-color: ${white};
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 4px;
    right: 8px;
    color: #000;
    font-weight: bold;
    font-size: 15px;
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
  top: 29px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: ${gray1};
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    margin: 3px 0;
  }
  border: solid 1px ${gray1};
  border-radius: 10px;
  background-color: ${white};
`
const Option = styled.div`
  padding-left: 8px;
  box-sizing: border-box;
  font-size: 14px;
  color: ${black};
  height: 30px;
  line-height: 30px;
`

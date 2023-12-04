import React from 'react'
import { styled } from 'styled-components'

import Spacer from './Spacer'

function replaceNewlinesWithBr(text) {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))
}

const CYModalScreen = ({
  title = '',
  content = '',
  buttonText = '',
  buttonFunc = null,
}) => {

  return (
    <div>
      <CModalContainer>
        <CModalContent>
          <CTitle>{replaceNewlinesWithBr(title)}</CTitle>
          <Spacer space={10} />
          <CText>{replaceNewlinesWithBr(content)}</CText>
          <Spacer space={30} />
          <CButton onClick={buttonFunc}>{buttonText}</CButton>
        </CModalContent>
      </CModalContainer>
    </div>
  )
}
export default CYModalScreen

const CModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const CModalContent = styled.div`
  box-sizing: border-box;
  margin: 25px;
  background-color: #fff;
  padding: 60px 80px;
  border-radius: 10px;
  width: 600px;
  max-height: 80vh;
  overflow: auto;
`

const CTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
`

const CText = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  color: #7E8396;
`
const CButton = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  height: 40px;
  line-height: 40px;
  margin: auto;
  width: 150px;
  background-color: #3CAF87;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`

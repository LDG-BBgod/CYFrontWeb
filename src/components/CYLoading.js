import React from 'react'
import { styled } from 'styled-components'

const CYLoading = () => {
  return (
    <CModalContainer>
      <img src="/img/loading.svg" alt="로딩" height={80} width={80} />
    </CModalContainer>
  )
}
export default CYLoading

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

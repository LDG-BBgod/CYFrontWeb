// module
import { useEffect, useState, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'
// action

// api

// components
import Typography from '../components/Typography'
import Spacer from '../components/Spacer.js'
import Account from './setting/Account'
import Etc from './setting/Etc'
import Reserve from './setting/Reserve'
// common
import { green, gray4, gray5, white } from '../common'

const List = ({ text, onClick, isSelected }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        width: '100%',

        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: isSelected ? 11 : 15,
        paddingRight: 15,
        borderLeft: isSelected ? `solid 4px ${green}` : 'none',
        cursor: 'pointer',
        background: isSelected ? gray5 : white,
      }}
      onClick={onClick}
    >
      <Spacer horizontal={false} space={10} />
      <Typography fontSize={18} color={gray4}>
        {text}
      </Typography>
    </div>
  )
}

const Setting = () => {
  const navigate = useNavigate()
  const [selectedList, setSelectedList] = useState(
    window.location.pathname.split('/')[3],
  )

  const handleOnClick = (name) => {
    navigate(`/dashboard/setting/${name}`)
    setSelectedList(name)
  }
  return (
    <CBody>
      <CList>
        <List
          text={'계정관리'}
          onClick={() => {
            handleOnClick('account')
          }}
          isSelected={selectedList === 'account'}
        />
        <List
          text={'예약관리'}
          onClick={() => {
            handleOnClick('reserve')
          }}
          isSelected={selectedList === 'reserve'}
        />
        <List
          text={'기타'}
          onClick={() => {
            handleOnClick('etc')
          }}
          isSelected={selectedList === 'etc'}
        />
      </CList>
      <Spacer horizontal={false} space={5} />
      <CContent>
        <Routes>
          <Route path="/account" Component={Account} />
          <Route path="/reserve" Component={Reserve} />
          <Route path="/etc" Component={Etc} />
        </Routes>
      </CContent>
    </CBody>
  )
}
export default Setting

const CBody = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 250px 5px 1fr;
  width: 100%;
  height: calc(100% - 67px);
`

const CList = styled.div`
  box-sizing: border-box;
  background: ${white};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CContent = styled.div`
  box-sizing: border-box;
  width: 100%;

  background: ${white};
  padding: 40px 30px;
  overflow: auto;
`

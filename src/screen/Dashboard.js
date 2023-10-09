// module
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
// action

// api

// components
import Patient from './Patient'
import Reservation from './Reservation'
import Comunity from './Comunity'
import Statistics from './Statistics'
import Setting from './Setting'
import Spacer from '../components/Spacer.js'
import Typography from '../components/Typography'
// common
import { green, white, gray3, gray4, gray5, gray6 } from '../common'
import listImg1_1 from '../srcImg/listImg1_1.svg'
import listImg1_2 from '../srcImg/listImg1_2.svg'
import listImg1_3 from '../srcImg/listImg1_3.svg'
import listImg2_1 from '../srcImg/listImg2_1.svg'
import listImg2_2 from '../srcImg/listImg2_2.svg'

const List = ({ img, text, onClick, isSelected }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        width: '100%',

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: isSelected ? 12 : 15,
        paddingRight: 15,
        borderLeft: isSelected ? `solid 3px ${green}` : 'none',
        cursor: 'pointer',
        background: isSelected ? gray5 : white,
      }}
      onClick={onClick}
    >
      <img src={img} alt="로고" height={22} width={22} />
      <Spacer horizontal={false} space={15} />
      <Typography fontSize={14} color={gray4}>
        {text}
      </Typography>
      <img
        src="/img/rightArrow1.svg"
        alt="화살표"
        height={12}
        width={10}
        style={{ marginLeft: 'auto' }}
      />
    </div>
  )
}

const DashBoard = () => {
  const navigate = useNavigate()
  // const userType = window.sessionStorage.getItem('userType')
  // const userId = window.sessionStorage.getItem('userId')
  // const token = window.sessionStorage.getItem('token')
  const [selectedList, setSelectedList] = useState('')
  const [title, setTitle] = useState('대쉬보드')

  const handleOnClick = (name) => {
    navigate(`/dashboard/${name}`)
    setSelectedList(name)
  }

  useEffect(() => {
    switch (selectedList) {
      case 'patient':
        setTitle('환자관리')
        break
      case 'reservation':
        setTitle('예약관리')
        break
      case 'comunity':
        setTitle('커뮤니티')
        break
      case 'statistics':
        setTitle('통계')
        break
      case 'setting':
        setTitle('환경설정')
        break
      default:
        setTitle('대쉬보드')
        break
    }
  }, [selectedList])

  return (
    <div style={{ background: gray3 }}>
      <CHeader>
        <img src="/img/logo_green.svg" alt="로고" height={40} width={50} />
        <CHeaderRight>
          <img
            src="/img/message.svg"
            alt="로고"
            height={20}
            width={20}
            style={{ cursor: 'pointer' }}
          />
          <Spacer horizontal={false} space={28} />
          <img
            src="/img/darkMode.svg"
            alt="로고"
            height={20}
            width={20}
            style={{ cursor: 'pointer' }}
          />
          <Spacer horizontal={false} space={28} />
          <img
            src="/img/help.svg"
            alt="로고"
            height={20}
            width={20}
            style={{ cursor: 'pointer' }}
          />
        </CHeaderRight>
      </CHeader>
      <Spacer space={2} />
      <CBody>
        <CList>
          <Spacer space={30} />
          <div>프로필 들어가야됨</div>
          <Spacer space={30} />
          <div style={{ marginRight: 'auto', marginLeft: 15 }}>
            <Typography fontSize={16} color={gray4}>
              관리
            </Typography>
          </div>
          <Spacer space={15} />
          <List
            img={listImg1_1}
            text={'환자관리'}
            onClick={() => {
              handleOnClick('patient')
            }}
            isSelected={selectedList === 'patient'}
          />
          <List
            img={listImg1_2}
            text={'예약관리'}
            onClick={() => {
              handleOnClick('reservation')
            }}
            isSelected={selectedList === 'reservation'}
          />
          <List
            img={listImg1_3}
            text={'커뮤니티'}
            onClick={() => {
              handleOnClick('comunity')
            }}
            isSelected={selectedList === 'comunity'}
          />
          <Spacer space={40} />
          <div style={{ marginRight: 'auto', marginLeft: 15 }}>
            <Typography fontSize={16} color={gray4}>
              설정
            </Typography>
          </div>
          <Spacer space={15} />
          <List
            img={listImg2_1}
            text={'통계'}
            onClick={() => {
              handleOnClick('statistics')
            }}
            isSelected={selectedList === 'statistics'}
          />
          <List
            img={listImg2_2}
            text={'환경설정'}
            onClick={() => {
              handleOnClick('setting')
            }}
            isSelected={selectedList === 'setting'}
          />
        </CList>
        <CContent>
          <Typography fontSize={28} color={gray6}>
            {title}
          </Typography>
          <Spacer space={30} />
          <Routes>
            <Route path="/patient" Component={Patient} />
            <Route path="/reservation" Component={Reservation} />
            <Route path="/comunity" Component={Comunity} />
            <Route path="/statistics" Component={Statistics} />
            <Route path="/setting" Component={Setting} />
          </Routes>
        </CContent>
      </CBody>
    </div>
  )
}
export default DashBoard

const CHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 100px 0 100px;
  width: 100%;
  height: 75px;
  background-color: ${white};
`
const CHeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`
const CBody = styled.div`
  display: grid;
  grid-template-columns: 216px 1fr;
  width: 100%;
  height: calc(100vh - 77px);
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
  padding: 30px 20px 20px 30px;
`

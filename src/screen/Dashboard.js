// module
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, batch } from 'react-redux'
import { styled } from 'styled-components'
import axios from 'axios'
// action

// api

// components
import Welcome from './Welcome'
import Patient from './Patient'
import Reservation from './Reservation'
import Comunity from './Comunity'
import Statistics from './Statistics'
import Setting from './Setting'
import Message from './Message'
import Test from './Test'

import Spacer from '../components/Spacer.js'
import Typography from '../components/Typography'
import CYLoading from '../components/CYLoading.js'
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
  const [initSetting, setInitSetting] = useState('false')
  const [title, setTitle] = useState('대쉬보드')
  const [selectedList, setSelectedList] = useState(
    window.location.pathname.split('/')[2],
  )
  const handleOnClick = (name) => {
    navigate(`/dashboard/${name}`)
    setSelectedList(name)
  }

  useEffect(() => {
    const regexSetting = /setting/
    const route = regexSetting.test(selectedList) ? 'setting' : selectedList

    switch (route) {
      case 'welcome':
        setTitle('Welcome')
        break
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
      case 'message':
        setTitle('메세지')
        break
      default:
        setTitle('대쉬보드')
        break
    }
  }, [selectedList])

  useEffect(() => {
    const isLogin = window.sessionStorage.getItem('isLogin')

    if (isLogin === 'true') {
      const OID = window.sessionStorage.getItem('OID')

      const getInfo = async () => {
        await axios
          .post(process.env.REACT_APP_HOSPITAL_READ, { OID })
          .then((res) => {
            window.sessionStorage.setItem(
              'hospitalType',
              res.data.msg.hospitalType,
            )
            window.sessionStorage.setItem(
              'hospitalName',
              res.data.msg.hospitalName,
            )
            window.sessionStorage.setItem('address1', res.data.msg.address1)
            window.sessionStorage.setItem('address2', res.data.msg.address2)
            window.sessionStorage.setItem('address3', res.data.msg.address3)
            window.sessionStorage.setItem(
              'hospitalPhone',
              res.data.msg.hospitalPhone,
            )
            window.sessionStorage.setItem('bn', res.data.msg.bn)

            window.sessionStorage.setItem('doctorName', res.data.msg.doctorName)
            window.sessionStorage.setItem(
              'licenseType',
              res.data.msg.licenseType,
            )
            window.sessionStorage.setItem('license', res.data.msg.license)
            window.sessionStorage.setItem(
              'doctorPhone',
              res.data.msg.doctorPhone,
            )
            window.sessionStorage.setItem('email', res.data.msg.email)
            window.sessionStorage.setItem(
              'introduction',
              res.data.msg.introduction,
            )
            window.sessionStorage.setItem(
              'imageUrls',
              JSON.stringify(res.data.msg.imageUrls),
            )
            window.sessionStorage.setItem(
              'initSetting',
              res.data.msg.initSetting,
            )
            setInitSetting(res.data.msg.initSetting)
            window.sessionStorage.setItem(
              'timeSection',
              res.data.msg.timeSection,
            )
            window.sessionStorage.setItem('daySH', res.data.msg.daySH)
            window.sessionStorage.setItem('daySM', res.data.msg.daySM)
            window.sessionStorage.setItem('dayEH', res.data.msg.dayEH)
            window.sessionStorage.setItem('dayEM', res.data.msg.dayEM)
            window.sessionStorage.setItem('skipWeek1', res.data.msg.skipWeek1)
            window.sessionStorage.setItem('week1SH', res.data.msg.week1SH)
            window.sessionStorage.setItem('week1SM', res.data.msg.week1SM)
            window.sessionStorage.setItem('week1EH', res.data.msg.week1EH)
            window.sessionStorage.setItem('week1EM', res.data.msg.week1EM)
            window.sessionStorage.setItem('skipWeek2', res.data.msg.skipWeek2)
            window.sessionStorage.setItem('week2SH', res.data.msg.week2SH)
            window.sessionStorage.setItem('week2SM', res.data.msg.week2SM)
            window.sessionStorage.setItem('week2EH', res.data.msg.week2EH)
            window.sessionStorage.setItem('week2EM', res.data.msg.week2EM)
            window.sessionStorage.setItem('skipLunch', res.data.msg.skipLunch)
            window.sessionStorage.setItem('lunchSH', res.data.msg.lunchSH)
            window.sessionStorage.setItem('lunchSM', res.data.msg.lunchSM)
            window.sessionStorage.setItem('lunchEH', res.data.msg.lunchEH)
            window.sessionStorage.setItem('lunchEM', res.data.msg.lunchEM)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      getInfo()
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <div style={{ background: gray3 }}>
      <CHeader>
        <img
          style={{ cursor: 'pointer' }}
          src="/img/logo_green.svg"
          alt="로고"
          height={40}
          width={50}
          onClick={() => {
            navigate('/dashboard/welcome')
            setSelectedList('welcome')
          }}
        />
        <CHeaderRight>
          <img
            src="/img/message.svg"
            alt="로고"
            height={20}
            width={20}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/dashboard/message')
              setSelectedList('message')
            }}
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
            isSelected={selectedList.includes('patient')}
          />
          <List
            img={listImg1_2}
            text={'예약관리'}
            onClick={() => {
              handleOnClick('reservation')
            }}
            isSelected={selectedList.includes('reservation')}
          />
          <List
            img={listImg1_3}
            text={'커뮤니티'}
            onClick={() => {
              handleOnClick('comunity')
            }}
            isSelected={selectedList.includes('comunity')}
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
            isSelected={selectedList.includes('statistics')}
          />
          <List
            img={listImg2_2}
            text={'환경설정'}
            onClick={() => {
              handleOnClick('setting/account')
            }}
            isSelected={selectedList.includes('setting')}
          />
        </CList>

        <CContent>
          <Typography fontSize={28} color={gray6}>
            {title}
          </Typography>
          <Spacer space={30} />
          <Routes>
            <Route
              path="/welcome"
              element={<Welcome isInitSetting={initSetting} />}
            />
            <Route path="/patient" Component={Patient} />
            <Route path="/reservation" Component={Reservation} />
            <Route path="/comunity" Component={Comunity} />
            <Route path="/statistics" Component={Statistics} />
            <Route path="/setting/*" Component={Setting} />
            <Route path="/message" Component={Message} />
            <Route path="/test" Component={Test} />
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
  overflow: auto;
  box-sizing: border-box;
  padding: 30px 20px 20px 30px;
`

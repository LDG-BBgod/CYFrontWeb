// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// action

// api

// components
import Spacer from '../components/Spacer.js'
import CYInput1 from '../components/CYInput1.js'
// common
import { gray1, gray2, green } from '../common.js'
import CYButton1 from '../components/CYButton1.js'
import Typography from '../components/Typography.js'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    id: '',
    pw: '',
  })

  const handleId = (val) => {
    setData({ ...data, id: val })
  }
  const handlePw = (val) => {
    setData({ ...data, pw: val })
  }

  const GoRegister = () => {
    return (
      <div
        onClick={() => {
          navigate('/register')
        }}
      >
        <Typography color={green} isA={true}>
          회원가입하기
        </Typography>
      </div>
    )
  }
  const handleButton = async () => {
    if (!data.id || !data.pw) {
      alert('아이디, 비밀번호를 입력해주세요.')
    } else {
      await axios
        .post(process.env.REACT_APP_LOGIN, data)
        .then((res) => {
          if (!res.data.err) {
            if (res.data.msg.success) {
              window.sessionStorage.setItem('userType', res.data.msg.type)
              window.sessionStorage.setItem('userId', res.data.msg.id)
              window.sessionStorage.setItem('token', res.data.msg.token)
              window.sessionStorage.setItem('OID', res.data.msg.OID)
              window.sessionStorage.setItem('isLogin', 'true')
              navigate('/dashboard/welcome')
            } else {
              alert(
                '아이디 혹은 비밀번호가 잘못되었습니다.\n(회원가입 및 승인처리 후 로그인이 가능합니다.)',
              )
            }
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <div>
      <CCenter>
        <img src="img/mobilepc.png" alt="로고" height={464} width={591} />
        <Spacer horizontal={false} space={70} />
        <div>
          <CBox>
            <img src="img/logo_green.svg" alt="로고" height={66} width={95} />
            <Spacer space={60} />
            <CYInput1
              title={'아이디'}
              placeholer="아이디를 입력해주세요"
              onValueChange={handleId}
            />
            <Spacer space={20} />
            <CYInput1
              title={'비밀번호'}
              placeholer="비밀번호를 입력해주세요"
              onValueChange={handlePw}
              type="password"
            />
            <Spacer space={35} />
            <div style={{ marginLeft: 'auto' }}>
              <CYButton1
                text={'로그인'}
                fontSize="16px"
                width="100px"
                height="35px"
                buttonFunc={handleButton}
              />
            </div>
          </CBox>
          <Spacer space={12} />
          <CBottomText>
            <Typography>아직 회원이 아니신가요?</Typography>
            <Spacer horizontal={false} space={5} />
            <GoRegister />
          </CBottomText>
        </div>
      </CCenter>
      <CFooter>
        <CBox1>
          <Typography fontSize={12} color={gray2}>
            개인정보처리방침
          </Typography>
          <Spacer horizontal={false} space={30} />
          <Typography fontSize={12} color={gray2}>
            위치
          </Typography>
          <Spacer horizontal={false} space={30} />
          <Typography fontSize={12} color={gray2}>
            약관
          </Typography>
          <Spacer horizontal={false} space={30} />
          <Typography fontSize={12} color={gray2}>
            소개
          </Typography>
          <Spacer horizontal={false} space={30} />
          <Typography fontSize={12} color={gray2}>
            회원가입
          </Typography>
          <Spacer horizontal={false} space={30} />
        </CBox1>
        <Spacer space={30} />
        <Typography fontSize={12} color={gray2}>
          ⓒ 2023 CHIYOOM Inc.
        </Typography>
      </CFooter>
    </div>
  )
}

export default Login

const CCenter = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
`
const CBox = styled.div`
  box-sizing: border-box;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px ${gray1};
  border-radius: 10px;
  padding: 20px;
`
const CBottomText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const CFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CBox1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

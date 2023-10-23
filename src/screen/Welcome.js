// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
// action

// api

// components
import Typography from '../components/Typography'
import Spacer from '../components/Spacer.js'
import CYButton1 from '../components/CYButton1'
// common
import { black, white, gray6 } from '../common'

const Welcome = () => {
  const [initSetting, setInitSetting] = useState(
    window.sessionStorage.getItem('initSetting'),
  )
  const [step, setStep] = useState(1)

  const handleInitButton = async () => {
    const userType = window.sessionStorage.getItem('userType')
    const userId = window.sessionStorage.getItem('userId')
    const token = window.sessionStorage.getItem('token')
    await axios
      .post(
        userType === 'hospital'
          ? process.env.REACT_APP_UPDATEHOSPITAL
          : process.env.REACT_APP_UPDATECENTER,
        { userId, token, type: 'initSetting' },
      )
      .then((res) => {
        if (res.data.msg.success) {
          alert('예시문구) 세팅이 완료되었습니다.')
          setInitSetting('true')
          window.sessionStorage.setItem('initSetting', 'true')
        } else {
          alert('다시한번 시도해주세요.')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <>
      {initSetting === 'true' ? (
        <CBody>공지사항</CBody>
      ) : (
        <CBody style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontSize={28} color={gray6}>
            치윰 서비스를 시작해보세요!
          </Typography>
          <Spacer space={36} />
          {step === 1 ? (
            <>
              <Typography fontSize={20} color={black}>
                예약 화면 인터페이스를 구성을 위한 선택을 해주세요.
              </Typography>
              <Spacer space={5} />
              <Typography fontSize={20} color={black}>
                변경 시 예약 내역이 초기화 될 수 있으니 신중하게 선택해주세요:)
              </Typography>
              <Spacer space={30} />
              {/* 예약 단위 설정 */}
              <Typography fontSize={20} color={black}>
                예약시간단위설정 예시, 운영시간 설정 등등
              </Typography>
              <Spacer space={100} />
              <div style={{ marginLeft: 'auto' }}>
                <CYButton1
                  buttonFunc={() => {
                    setStep(2)
                  }}
                  text={'선택완료'}
                  width={180}
                  height={45}
                />
              </div>
            </>
          ) : (
            <>
              <Typography fontSize={20} color={black}>
                예약관리, 시스템관리, 커뮤니티 관리 등을 도와줄 병원의
                업무담당자를 추가해주세요:)
              </Typography>
              <Spacer space={30} />
              {/* 추가 회원가입용 코드 전달 */}
              <Typography fontSize={20} color={black}>
                이메일 주소 입력, 보내기버튼, 안내내용 등등등
              </Typography>
              <Spacer space={100} />
              <div style={{ marginLeft: 'auto' }}>
                <CYButton1
                  buttonFunc={handleInitButton}
                  text={'나중에하기'}
                  width={180}
                  height={45}
                />
                <CYButton1
                  buttonFunc={() => {
                    alert('보냈습니다.')
                    // 직원 가입 링크 보내는 로직 작성 예정
                  }}
                  text={'보내기'}
                  width={180}
                  height={45}
                />
              </div>
            </>
          )}
        </CBody>
      )}
    </>
  )
}
export default Welcome

const CBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 67px);
  background: ${white};
  padding: 40px 30px;
  overflow: auto;
`

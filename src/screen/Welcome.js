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
import CYButton2 from '../components/CYButton2'
import CYRadio from '../components/CYRadio.js'
import CYSelect2 from '../components/CYSelect2.js'
import CYCheckbox from '../components/CYCeckbox.js'
// common
import { black, white, gray4, gray5, gray6, green } from '../common'

const emailLogic = (val) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(val)
}
const areAllEmailsValid = (emailArray) => {
  return emailArray.every(emailLogic)
}

const isAllValuesFilled = (data) => {
  for (const key in data) {
    // 예외 처리: true 또는 false가 value로 설정된 key는 무시
    if (data[key] === true || data[key] === false) {
      continue
    }

    // 값이 빈 문자열인 경우 false 반환
    if (data[key] === '') {
      return false
    }
  }

  // 모든 값이 빈 문자열이 아니면 true 반환
  return true
}

const Welcome = ({ isInitSetting }) => {
  const [initSetting, setInitSetting] = useState('')
  const [step, setStep] = useState(1)
  const [emails, setEmails] = useState([''])
  const [radioSelect, setRadioSelect] = useState('')
  const hOption = [
    '00시',
    '01시',
    '02시',
    '03시',
    '04시',
    '05시',
    '06시',
    '07시',
    '08시',
    '09시',
    '10시',
    '11시',
    '12시',
    '13시',
    '14시',
    '15시',
    '16시',
    '17시',
    '18시',
    '19시',
    '20시',
    '21시',
    '22시',
    '23시',
    '24시',
  ]
  const mOption = ['00분', '30분']
  const [data, setData] = useState({
    timeSection: '30분마다 예약',
    daySH: '00시',
    daySM: '00분',
    dayEH: '00시',
    dayEM: '00분',
    skipWeek1: false,
    week1SH: '00시',
    week1SM: '00분',
    week1EH: '00시',
    week1EM: '00분',
    skipWeek2: false,
    week2SH: '00시',
    week2SM: '00분',
    week2EH: '00시',
    week2EM: '00분',
    skipLunch: false,
    lunchSH: '00시',
    lunchSM: '00분',
    lunchEH: '00시',
    lunchEM: '00분',
  })

  const addEamil = () => {
    setEmails([...emails, ''])
  }
  const handleInputChange = (index, value) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  const handleSendEmail = async () => {
    const userId = window.sessionStorage.getItem('userId')
    const token = window.sessionStorage.getItem('token')
    if (areAllEmailsValid(emails)) {
      await axios
        .post(process.env.REACT_APP_HOSPITAL_MEMBERS, {
          userId,
          token,
          emails,
        })
        .then((res) => {
          if (res.data.msg.success) {
            alert('구성원 회원가입을 진행할 메일을 전송하였습니다.')
            setStep(2)
          } else {
            alert('다시한번 시도해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('모든 입력칸을 이메일 형식으로 입력해주세요.')
    }
  }

  const handleRadioChange = (value) => {
    setRadioSelect(value)
  }

  const handleInitButton = async () => {
    const userId = window.sessionStorage.getItem('userId')
    const token = window.sessionStorage.getItem('token')
    if (isAllValuesFilled(data)) {
      await axios
        .post(process.env.REACT_APP_HOSPITAL_UPDATE, {
          userId,
          token,
          type: 'initSetting',
          data,
        })
        .then((res) => {
          if (res.data.msg.success) {
            alert('모든 설정이 완료되었습니다.')
            setInitSetting('true')
            window.sessionStorage.setItem('initSetting', 'true')
            window.location.reload()
          } else {
            alert('다시한번 시도해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('모든 시간을 설정해주세요.')
    }
  }
  const handleInitButtonSkip = async () => {
    const userId = window.sessionStorage.getItem('userId')
    const token = window.sessionStorage.getItem('token')
    await axios
      .post(process.env.REACT_APP_HOSPITAL_UPDATE, {
        userId,
        token,
        type: 'initSettingSkip',
      })
      .then((res) => {
        if (res.data.msg.success) {
          alert('모든 설정이 완료되었습니다.')
          setInitSetting('true')
          window.sessionStorage.setItem('initSetting', 'true')
          window.location.reload()
        } else {
          alert('다시한번 시도해주세요.')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    setInitSetting(isInitSetting)
  }, [isInitSetting])

  return (
    <>
      {initSetting === 'true' ? (
        <CBody>공지사항 및 알림 서비스 준비 예정</CBody>
      ) : (
        <CBody style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontSize={28} color={gray6}>
            치윰 서비스를 시작해보세요!
          </Typography>
          <Spacer space={36} />
          {step === 1 ? (
            // 스탭1 //
            //       //
            <>
              <Typography fontSize={20} color={black}>
                예약관리, 시스템관리, 커뮤니티 관리 등을 도와줄 병원의
                업무담당자를 추가해주세요:)
              </Typography>
              <Spacer space={50} />
              <Typography fontSize={20} color={gray4}>
                추가 회원가입용 코드 전달
              </Typography>
              {emails.map((value, index) => (
                <div key={index}>
                  <Spacer space={20} />
                  <CInput
                    value={value}
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
              <Spacer space={20} />

              <CAddButton onClick={addEamil}>
                <img
                  style={{ margin: 12.5 }}
                  src="/img/plusImg.svg"
                  alt="plus"
                  height={25}
                  width={25}
                />
              </CAddButton>
              <Spacer space={30} />

              <Typography>이메일 주소를 정확하게 입력해주세요.</Typography>
              <Spacer space={8} />
              <Typography>
                치윰은 환우들의 치료를 위한 환경을 제공하기 위하여 최선을
                다하겠습니다.
              </Typography>

              <Spacer space={60} />
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <CYButton1
                  buttonFunc={handleSendEmail}
                  text={'보내기'}
                  width={180}
                  height={45}
                />
                <Spacer horizontal={false} space={15} />
                <CYButton2
                  buttonFunc={() => {
                    setStep(2)
                  }}
                  text={'나중에하기'}
                  width={180}
                  height={45}
                />
              </div>
            </>
          ) : (
            // 스탭2 //
            //       //
            <>
              <Typography fontSize={20} color={black}>
                예약 화면 인터페이스를 구성을 위한 선택을 해주세요.
              </Typography>
              <Spacer space={8} />
              <Typography fontSize={16} color={green}>
                변경 시 예약 내역이 초기화 될 수 있으니 신중하게 선택해주세요:)
              </Typography>
              <Spacer space={50} />

              <Typography fontSize={20} color={gray6}>
                예약 시간 단위 설정
              </Typography>
              <Spacer space={20} />
              <CYRadio
                options={['30분마다 예약', '15분마다 예약', '10분마다 예약']}
                onChange={handleRadioChange}
                setData={setData}
                data={data}
              />
              <Spacer space={60} />

              <Typography fontSize={20} color={gray6}>
                운영 시간 설정
              </Typography>
              <Spacer space={20} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 100 }}>
                  <Typography fontSize={18} color={gray6}>
                    평일
                  </Typography>
                </div>
                <CYSelect2
                  optionData={hOption}
                  dataType={'daySH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'daySM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <Typography fontSize={18} color={gray6}>
                  ~
                </Typography>
                <Spacer horizontal={false} space={20} />
                <CYSelect2
                  optionData={hOption}
                  dataType={'dayEH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'dayEM'}
                  setData={setData}
                  data={data}
                />
              </div>
              <Spacer space={20} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 100 }}>
                  <Typography fontSize={18} color={gray6}>
                    토요일
                  </Typography>
                </div>
                <CYSelect2
                  optionData={hOption}
                  dataType={'week1SH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'week1SM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <Typography fontSize={18} color={gray6}>
                  ~
                </Typography>
                <Spacer horizontal={false} space={20} />
                <CYSelect2
                  optionData={hOption}
                  dataType={'week1EH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'week1EM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <CYCheckbox
                  label={'운영안함'}
                  dataType={'skipWeek1'}
                  setData={setData}
                  data={data}
                />
              </div>
              <Spacer space={20} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 100 }}>
                  <Typography fontSize={18} color={gray6}>
                    일요일
                  </Typography>
                </div>
                <CYSelect2
                  optionData={hOption}
                  dataType={'week2SH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'week2SM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <Typography fontSize={18} color={gray6}>
                  ~
                </Typography>
                <Spacer horizontal={false} space={20} />
                <CYSelect2
                  optionData={hOption}
                  dataType={'week2EH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'week2EM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <CYCheckbox
                  label={'운영안함'}
                  dataType={'skipWeek2'}
                  setData={setData}
                  data={data}
                />
              </div>
              <Spacer space={60} />

              <Typography fontSize={20} color={gray6}>
                점심, 쉬는 시간 설정
              </Typography>
              <Spacer space={20} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 100 }}>
                  <Typography fontSize={18} color={gray6}>
                    점심시간
                  </Typography>
                </div>
                <CYSelect2
                  optionData={hOption}
                  dataType={'lunchSH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'lunchSM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <Typography fontSize={18} color={gray6}>
                  ~
                </Typography>
                <Spacer horizontal={false} space={20} />
                <CYSelect2
                  optionData={hOption}
                  dataType={'lunchEH'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={10} />
                <CYSelect2
                  optionData={mOption}
                  dataType={'lunchEM'}
                  setData={setData}
                  data={data}
                />
                <Spacer horizontal={false} space={20} />
                <CYCheckbox
                  label={'점심시간 없음'}
                  dataType={'skipLunch'}
                  setData={setData}
                  data={data}
                />
              </div>
              <Spacer space={60} />

              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <CYButton1
                  buttonFunc={handleInitButton}
                  text={'설정 완료'}
                  width={180}
                  height={45}
                />
                <Spacer horizontal={false} space={15} />
                <CYButton2
                  buttonFunc={handleInitButtonSkip}
                  text={'나중에하기'}
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
const CInput = styled.input`
  box-sizing: border-box;
  width: 500px;
  height: 50px;
  font-size: 20px;
  border: none;
  background-color: ${gray5};
  border-radius: 10px;
  padding-left: 15px;
`
const CAddButton = styled.button`
  width: 500px;
  height: 50px;
  border: none;
  background-color: ${gray5};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

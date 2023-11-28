// module
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import DaumPostcode from 'react-daum-postcode'
import axios from 'axios'

// action

// api

// components
import Spacer from '../components/Spacer.js'
import Typography from '../components/Typography'
import CYInput2 from '../components/CYInput2.js'
import CYInputAddress from '../components/CYInputAddress.js'
import CYButton1 from '../components/CYButton1.js'
import CYButton2 from '../components/CYButton2.js'
import CYSixInput from '../components/CYSixInput.js'
import CYSelect from '../components/CYSelect.js'
// common
import { green, gray3, gray4, startGreen, endGreen } from '../common.js'

// 이메일 모달 작성
const ModalEmail = ({ setModalEmail, setModalPhone, data }) => {
  const [inputValue, setInputValue] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const sendEmail = async () => {
    await axios
      .post(process.env.REACT_APP_HOSPITAL_EMAILVERIFY, data)
      .then((res) => {})
      .catch((err) => {
        console.error(err)
      })
  }

  const handleDigitsChange = (digits) => {
    const isComplete = digits.every((digit) => digit !== '')
    setIsComplete(isComplete)
    if (isComplete) {
      setInputValue(digits.join(''))
    }
  }

  const handdleRetryButton = () => {
    sendEmail()
  }
  const handdlePrevButton = () => {
    setModalEmail(false)
  }
  const handdleNextButton = async () => {
    if (isComplete) {
      await axios
        .post(process.env.REACT_APP_HOSPITAL_EMAILCHECK, {
          email: data.email,
          verificationCode: inputValue,
        })
        .then((res) => {
          if (res.data.msg.match) {
            setModalEmail(false)
            setModalPhone(true)
          } else {
            alert('인증번호를 다시한번 확인해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('인증번호 6자리를 입력해주세요.')
    }
  }

  useEffect(() => {
    sendEmail()
  }, [])

  return (
    <CModalContainer>
      <CModalContent>
        <CModalCenter>
          <img src="img/mailImg.svg" alt="email" height={120} width={154} />
          <Spacer space={60} />
          <Typography fontSize={28}>
            새 계정 생성을 위해 이메일로 전송된 코드를 확인해주세요.
          </Typography>
          <Spacer space={30} />
          <Typography fontSize={20} color={gray4}>
            확인 코드가 포함된 이메일이 duk0478@chiyoom.com 주소로
            전송되었습니다.
          </Typography>
          <Spacer space={10} />
          <Typography fontSize={20} color={gray4}>
            코드를 입력해주세요.
          </Typography>
          <Spacer space={30} />
          <CYSixInput onDigitsChange={handleDigitsChange} />
          <Spacer space={70} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <CYButton2
              text={'다시보내기'}
              width={160}
              height={40}
              fontSize={18}
              buttonFunc={handdleRetryButton}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <CYButton2
                text={'이전'}
                width={80}
                height={40}
                fontSize={18}
                buttonFunc={handdlePrevButton}
              />

              <CYButton1
                text={'확인'}
                width={80}
                height={40}
                fontSize={18}
                buttonFunc={handdleNextButton}
              />
            </div>
          </div>
        </CModalCenter>
      </CModalContent>
    </CModalContainer>
  )
}

// 핸드폰 모달 작성
const ModalPhone = ({ setModalEmail, setModalPhone, data, navigate }) => {
  const [inputValue, setInputValue] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const sendPhone = async () => {
    await axios
      .post(process.env.REACT_APP_HOSPITAL_PHONEVERIFY, data)
      .then((res) => {})
      .catch((err) => {
        console.error(err)
      })
  }

  const handleDigitsChange = (digits) => {
    const isComplete = digits.every((digit) => digit !== '')
    setIsComplete(isComplete)
    if (isComplete) {
      setInputValue(digits.join(''))
    }
  }

  const handdleRetryButton = () => {
    sendPhone()
  }
  const handdlePrevButton = () => {
    setModalPhone(false)
  }
  const handdleNextButton = async () => {
    if (isComplete) {
      await axios
        .post(process.env.REACT_APP_HOSPITAL_PHONECHECK, {
          doctorPhone: data.doctorPhone,
          verificationCode: inputValue,
        })
        .then(async (res) => {
          if (res.data.msg.match) {
            await axios
              .post(process.env.REACT_APP_HOSPITAL_CREATE, data)
              .then((res) => {
                if (!res.data.err) {
                  if (res.data.msg.isExist) {
                    alert('이미 존재하는 아이디 입니다.')
                  } else {
                    alert(
                      '계정이 생성되었습니다. 영업일 2일 이내 확인 처리 후 사용 가능합니다. ',
                    )
                    navigate('/login')
                  }
                } else {
                  alert('회원가입에 실패했습니다. 다시 시도해주세요.')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          } else {
            alert('인증번호를 다시한번 확인해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('인증번호 6자리를 입력해주세요.')
    }
  }

  useEffect(() => {
    sendPhone()
  }, [])

  return (
    <CModalContainer>
      <CModalContent>
        <CModalCenter>
          <img src="img/phoneImg.svg" alt="phone" height={120} width={72} />
          <Spacer space={60} />
          <Typography fontSize={28}>
            마지막입니다. 휴대전화 코드를 확인해주세요.
          </Typography>
          <Spacer space={30} />
          <Typography fontSize={20} color={gray4}>
            입력하신 번호로 코드가 전송되었습니다.
          </Typography>
          <Spacer space={10} />
          <Typography fontSize={20} color={gray4}>
            코드를 입력해주세요.
          </Typography>
          <Spacer space={30} />
          <CYSixInput onDigitsChange={handleDigitsChange} />
          <Spacer space={70} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <CYButton2
              text={'다시보내기'}
              width={160}
              height={40}
              fontSize={18}
              buttonFunc={handdleRetryButton}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <CYButton2
                text={'이전'}
                width={80}
                height={40}
                fontSize={18}
                buttonFunc={handdlePrevButton}
              />

              <CYButton1
                text={'확인'}
                width={80}
                height={40}
                fontSize={18}
                buttonFunc={handdleNextButton}
              />
            </div>
          </div>
        </CModalCenter>
      </CModalContent>
    </CModalContainer>
  )
}

const Rgister = () => {
  const navigate = useNavigate()
  const [isDoctor, setIsDoctor] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [modalEmail, setModalEmail] = useState(false)
  const [modalPhone, setModalPhone] = useState(false)
  const tempData = {
    id: 'padzz321',
    pw: 'ldg8410229!',
    pwCheck: 'ldg8410229!',
    hospitalType: '병원',
    hospitalName: '테스트병원',
    address1: '충남',
    address2: '계룡시',
    address3: '갈마로',
    hospitalPhone: '0428410229',
    bn: '12345678',
    doctorName: '이동권',
    licenseType: '전문의',
    license: '12341234',
    doctorPhone: '01054088229',
    email: 'padzz321@naver.com',
  }
  const initData = {
    id: '',
    pw: '',
    pwCheck: '',
    hospitalType: '병원',
    hospitalName: '',
    address1: '',
    address2: '',
    address3: '',
    hospitalPhone: '',
    bn: '',
    doctorName: '',
    licenseType: '전문의',
    license: '',
    doctorPhone: '',
    email: '',
  }
  const licenseList = [
    '정신건강간호사1급',
    '정신건강간호사2급',
    '정신건강사회복지사1급',
    '정신건강사회복지사2급',
    '정신건강임상심리사1급',
    '정신건강임상심리사2급',
    '정신건강작업치료사1급',
    '정신건강작업치료사2급',
    '간호사',
    '간호조무사',
  ]
  const [data, setData] = useState(tempData)

  const idLogic = (val) => {
    const regex = /^[a-zA-Z0-9가-힣]+$/
    return regex.test(val) && val.length >= 4 && val.length <= 12
  }
  const passwordLogic1 = (val) => {
    return val.length >= 6 && val.length <= 20
  }
  const passwordLogic2 = (val) => {
    const regex = /[!@#$%^&*]/
    return regex.test(val)
  }
  const passwordLogic3 = (val) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    return regex.test(val)
  }
  const rePasswordLogic = (val) => {
    return val === data.pw
  }
  const emailLogic = (val) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(val)
  }
  const commonLogic = (val) => {
    return val === ''
  }

  const handleChange = (field, val) => {
    setData({ ...data, [field]: val })
  }

  const handleButton = async () => {
    if (!idLogic(data.id)) {
      alert('[아이디]를 6~20글자 사이로 입력해주세요.')
    } else if (
      !passwordLogic1(data.pw) ||
      !passwordLogic2(data.pw) ||
      !passwordLogic3(data.pw)
    ) {
      alert(
        '[비밀번호]를 소문자, 숫자, 특수문자 조합의 6~20자 사이로 입력해주세요.',
      )
    } else if (!rePasswordLogic(data.pwCheck)) {
      alert('[비밀번호 확인]을 다시한번 확인해주세요')
    } else if (commonLogic(data.hospitalName)) {
      alert('[병원명]을 입력해주세요.')
    } else if (commonLogic(data.address1) || commonLogic(data.address2)) {
      alert('[병원주소]를 입력해주세요.')
    } else if (commonLogic(data.hospitalPhone)) {
      alert('[병원전화번호]를 입력해주세요.')
    } else if (commonLogic(data.bn)) {
      alert('[사업자등록번호]를 입력해주세요.')
    } else if (commonLogic(data.doctorName)) {
      alert('[의사성명]을 입력해주세요.')
    } else if (commonLogic(data.license)) {
      alert('[면허번호]를 입력해주세요.')
    } else if (commonLogic(data.licenseType)) {
      alert('[면허종류]를 선택해주세요.')
    } else if (commonLogic(data.doctorPhone)) {
      alert('[핸드폰번호]를 입력해주세요.')
    } else if (!emailLogic(data.email)) {
      alert('[이메일주소]를 다시한번 확인해주세요.')
    } else {
      setModalEmail(true)
    }
  }

  return (
    <CCenter>
      <Spacer space={100} />
      <div>
        <img src="img/logo_green.svg" alt="로고" height={66} width={95} />
        <Spacer horizontal={false} space={10} />
        <Typography fontSize={25}>에 오신것을 환영합니다!</Typography>
      </div>
      <Spacer space={50} />
      {isDoctor ? (
        <CToggle>
          <CToggledBox>
            <div>
              <Typography fontSize={20} color={green}>
                의사선생님
              </Typography>
              <Spacer horizontal={false} space={5} />
              <Typography fontSize={14}>회원가입</Typography>
            </div>
          </CToggledBox>
          <CToggleBox
            onClick={() => {
              setIsDoctor(false)
              setData(
                initData,
                (initData.hospitalType = '상담센터'),
                (initData.licenseType = ''),
              )
            }}
          >
            <div>
              <Typography fontSize={20} color={green}>
                상담선생님
              </Typography>
              <Spacer horizontal={false} space={5} />
              <Typography fontSize={14}>회원가입</Typography>
            </div>
          </CToggleBox>
        </CToggle>
      ) : (
        <CToggle>
          <CToggleBox
            onClick={() => {
              setIsDoctor(true)
              setData(initData)
            }}
          >
            <div>
              <Typography fontSize={20} color={green}>
                의사선생님
              </Typography>
              <Spacer horizontal={false} space={5} />
              <Typography fontSize={14}>회원가입</Typography>
            </div>
          </CToggleBox>
          <CToggledBox>
            <div>
              <Typography fontSize={20} color={green}>
                상담선생님
              </Typography>
              <Spacer horizontal={false} space={5} />
              <Typography fontSize={14}>회원가입</Typography>
            </div>
          </CToggledBox>
        </CToggle>
      )}
      <Spacer space={80} />

      <CYInput2
        value={data.id}
        title={'아이디'}
        placeholer="아이디를 입력해주세요"
        onValueChange={(val) => {
          handleChange('id', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.pw}
        title={'비밀번호'}
        placeholer="비밀번호를 입력해주세요"
        onValueChange={(val) => {
          handleChange('pw', val)
        }}
        type="password"
      />
      <Spacer space={40} />

      <CYInput2
        value={data.pwCheck}
        title={'비밀번호 확인'}
        placeholer="비밀번호를 재입력해주세요"
        onValueChange={(val) => {
          handleChange('pwCheck', val)
        }}
        type="password"
      />
      <Spacer space={40} />

      <CYInput2
        value={data.hospitalName}
        title={isDoctor ? '병원명' : '상담센터명'}
        placeholer={
          isDoctor ? '병원명을 입력해주세요' : '상담센터명을 입력해주세요'
        }
        onValueChange={(val) => {
          handleChange('hospitalName', val)
        }}
      />
      <Spacer space={40} />

      <CYInputAddress
        value1={data.address1}
        value2={data.address2}
        value3={data.address3}
        title={isDoctor ? '병원주소' : '상담센터주소'}
        onValueChange={(val) => {
          handleChange('address3', val)
        }}
        onClick={() => {
          setModalState(true)
        }}
      />
      {modalState ? (
        <CAddressPosition>
          <img
            style={{ marginLeft: 470, cursor: 'pointer' }}
            src="img/close.svg"
            alt="close"
            height={25}
            width={25}
            onClick={() => {
              setModalState(false)
            }}
          />
          <Spacer space={10} />
          <DaumPostcode
            style={{
              width: 500,
              height: 470,
              display: modalState ? 'block' : 'none',
            }}
            autoClose={false}
            onComplete={(res) => {
              setModalState(false)
              setData({
                ...data,
                address1: res.zonecode,
                address2: res.address,
              })
            }}
          />
        </CAddressPosition>
      ) : (
        <></>
      )}
      <Spacer space={40} />

      <CYInput2
        value={data.hospitalPhone}
        title={isDoctor ? '병원전화번호' : '상담센터전화번호'}
        placeholer=" - 기호 없이 숫자만 입력해주세요"
        onValueChange={(val) => {
          handleChange('hospitalPhone', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.bn}
        title={'사업자등록번호'}
        placeholer="사업자등록번호를 입력해주세요"
        onValueChange={(val) => {
          handleChange('bn', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.doctorName}
        title={isDoctor ? '의사성명' : '상담선생님명'}
        placeholer={
          isDoctor ? '의사성명을 입력해주세요' : '상담선생님명을 입력해주세요'
        }
        onValueChange={(val) => {
          handleChange('doctorName', val)
        }}
      />
      <Spacer space={40} />

      <div style={{ display: 'flex', width: '100%' }}>
        <CYInput2
          value={data.license}
          title={'면허번호'}
          placeholer="면허번호를 입력해주세요"
          onValueChange={(val) => {
            handleChange('license', val)
          }}
        />
        {isDoctor ? (
          <></>
        ) : (
          <>
            <Spacer horizontal={false} space={5} />
            <div style={{ marginTop: 32 }}>
              <CYSelect
                optionData={licenseList}
                setData={setData}
                data={data}
              />
            </div>
          </>
        )}
      </div>
      <Spacer space={40} />

      <CYInput2
        value={data.doctorPhone}
        title={'핸드폰번호'}
        placeholer=" - 기호 없이 숫자만 입력해주세요"
        onValueChange={(val) => {
          handleChange('doctorPhone', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.email}
        title={'이메일주소'}
        placeholer="이메일주소를 입력해주세요"
        onValueChange={(val) => {
          handleChange('email', val)
        }}
      />
      <Spacer space={60} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <CYButton2
          text={'이전'}
          width={160}
          height={40}
          fontSize={18}
          buttonFunc={() => {
            navigate('/login')
          }}
        />

        <CYButton1
          text={'회원가입 신청'}
          width={160}
          height={40}
          fontSize={18}
          buttonFunc={handleButton}
        />
      </div>

      <Spacer space={100} />
      {modalEmail && (
        <ModalEmail
          setModalEmail={setModalEmail}
          setModalPhone={setModalPhone}
          data={data}
        />
      )}
      {modalPhone && (
        <ModalPhone
          setModalEmail={setModalEmail}
          setModalPhone={setModalPhone}
          data={data}
          navigate={navigate}
        />
      )}
    </CCenter>
  )
}
export default Rgister

const CCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  margin: auto;
`
const CToggle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const CToggledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: solid 2px ${green};
  cursor: pointer;
  background-image: linear-gradient(
    to bottom,
    rgba(193, 255, 233, 0.2),
    rgba(0, 255, 167, 0.2)
  );
`
const CToggleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: solid 2px ${gray3};
  cursor: pointer;
`
const CAddressPosition = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

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
  min-width: 900px;
  box-sizing: border-box;
  margin: 25px;
  background-color: #fff;
  padding: 40px;
  max-height: 80vh;
  overflow: auto;
`

const CModalCenter = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

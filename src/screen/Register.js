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
// common
import { green, gray3, startGreen, endGreen } from '../common.js'

const Rgister = () => {
  const navigate = useNavigate()
  const [isDoctor, setIsDoctor] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [data, setData] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    hospitalName: '',
    doctorName: '',
    license: '',
    address1: '',
    address2: '',
    address3: '',
    bn: '',
    email: '',
  })

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
    } else if (commonLogic(data.doctorName)) {
      alert('[의사성명]을 입력해주세요.')
    } else if (commonLogic(data.license)) {
      alert('[면허번호]를 입력해주세요.')
    } else if (commonLogic(data.address1) || commonLogic(data.address2)) {
      alert('[병원주소]를 입력해주세요.')
    } else if (commonLogic(data.bn)) {
      alert('[사업자등록번호]를 입력해주세요.')
    } else if (!emailLogic(data.email)) {
      alert('[이메일주소]를 다시한번 확인해주세요.')
    } else {
      await axios
        .post(process.env.REACT_APP_CREATEHOSPITAL, data)
        .then((res) => {
          if (!res.data.err) {
            if(res.data.msg.isExist) {
              alert('이미 존재하는 아이디 입니다.')
            } else {
              alert('계정이 생성되었습니다. 영업일 2일 이내 확인 처리 후 사용 가능합니다. ')
              navigate('/login')
            }
          } else{
            alert('회원가입에 실패했습니다. 다시 시도해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
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
              setData({
                id: '',
                pw: '',
                pwCheck: '',
                hospitalName: '',
                doctorName: '',
                license: '',
                address1: '',
                address2: '',
                address3: '',
                bn: '',
                email: '',
              })
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
              setData({
                id: '',
                pw: '',
                pwCheck: '',
                hospitalName: '',
                doctorName: '',
                license: '',
                address1: '',
                address2: '',
                address3: '',
                bn: '',
                email: '',
              })
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
        title={'병원명'}
        placeholer="병원명을 입력해주세요"
        onValueChange={(val) => {
          handleChange('hospitalName', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.doctorName}
        title={'의사성명'}
        placeholer="의사성명을 입력해주세요"
        onValueChange={(val) => {
          handleChange('doctorName', val)
        }}
      />
      <Spacer space={40} />

      <CYInput2
        value={data.license}
        title={'면허번호'}
        placeholer="면허번호를 입력해주세요"
        onValueChange={(val) => {
          handleChange('license', val)
        }}
      />
      <Spacer space={40} />

      <CYInputAddress
        value1={data.address1}
        value2={data.address2}
        value3={data.address3}
        title={'병원주소'}
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
            style={{ marginLeft: 450, cursor: 'pointer' }}
            src="img/logo_green.svg"
            alt="로고"
            height={30}
            width={30}
            onClick={() => {
              setModalState(false)
            }}
          />
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
        value={data.bn}
        title={'사업자등록번호'}
        placeholer="사업자등록번호를 입력해주세요"
        onValueChange={(val) => {
          handleChange('bn', val)
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
      <div style={{ marginLeft: 'auto' }}>
        <CYButton1
          text={'회원가입 신청'}
          width={160}
          height={40}
          fontSize={18}
          buttonFunc={handleButton}
        />
      </div>
      <Spacer space={100} />
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

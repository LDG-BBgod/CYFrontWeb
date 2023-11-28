// module
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import { green, black, gray1, lightBlue } from '../common.js'

const SubRgister = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tempData = {
    OID: '',
    email: '',
    id: 'padzz321a',
    pw: 'ldg8410229!',
    pwCheck: 'ldg8410229!',
    name: '이동권간호사',
    licenseType: '',
    license: '12323123',
  }
  const initData = {
    OID: '',
    email: '',
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    licenseType: '',
    license: '',
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
    return regex.test(val) && val.length >= 6 && val.length <= 12
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
    } else if (commonLogic(data.name)) {
      alert('[성함]을 입력해주세요.')
    } else if (commonLogic(data.license)) {
      alert('[면허번호]를 입력해주세요.')
    } else if (commonLogic(data.licenseType)) {
      alert('[면허종류]를 선택해주세요.')
    } else {
      await axios
        .post(process.env.REACT_APP_HOSPITAL_MEMBER_CREATE, data)
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
    }
  }
  console.log(data)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const oid = searchParams.get('oid')
    const email = searchParams.get('email')
    const newData = { ...data, OID: oid, email }
    setData(newData)
  }, [])

  return (
    <CCenter>
      <Spacer space={100} />
      <div>
        <img src="img/logo_green.svg" alt="로고" height={66} width={95} />
        <Spacer horizontal={false} space={10} />
        <Typography fontSize={25}>에 오신것을 환영합니다!</Typography>
      </div>
      <Spacer space={50} />
      <CToggledBox>
        <div>
          <Typography fontSize={20} color={green}>
            구성원
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={14}>회원가입</Typography>
        </div>
      </CToggledBox>
      <Spacer space={80} />

      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        <Typography fontSize={20} color={black} fontWeight="bold">
          이메일주소
        </Typography>
        <Spacer space={12} />
        <CEmailBox>{data.email}</CEmailBox>
      </div>
      <Spacer space={40} />

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
        value={data.name}
        title={'성함'}
        placeholer={'성함을 입력해주세요'}
        onValueChange={(val) => {
          handleChange('name', val)
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

        <Spacer horizontal={false} space={5} />
        <div style={{ marginTop: 32 }}>
          <CYSelect optionData={licenseList} setData={setData} data={data} />
        </div>
      </div>
      <Spacer space={80} />

      <div
        style={{
          marginLeft: 'auto',
        }}
      >
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
export default SubRgister

const CCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  margin: auto;
`
const CToggledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 100%;
  border-bottom: solid 2px ${green};
  background-image: linear-gradient(
    to bottom,
    rgba(193, 255, 233, 0.2),
    rgba(0, 255, 167, 0.2)
  );
`

const CEmailBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding: 10px;
  border: solid 1px ${gray1};
  font-size: 14px;
  border-radius: 10px;
  background-color: ${lightBlue};
`

// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
// action

// api

// components
import Typography from '../../components/Typography'
import Spacer from '../../components/Spacer.js'
import CYButton1 from '../../components/CYButton1'
// common
import { black, gray4, gray5, gray6, white } from '../../common'

const emailLogic = (val) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(val)
}
const areAllEmailsValid = (emailArray) => {
  return emailArray.every(emailLogic)
}

const Member = () => {
  const [emails, setEmails] = useState([''])

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
            window.location.reload()
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

  return (
    <div>
      <Typography fontSize={24} color={gray6}>
        구성원 관리
      </Typography>
      <Spacer space={60} />
      <>
        <Typography fontSize={20} color={black}>
          예약관리, 시스템관리, 커뮤니티 관리 등을 도와줄 병원의 업무담당자를
          추가해주세요:)
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
        </div>
      </>
    </div>
  )
}
export default Member

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

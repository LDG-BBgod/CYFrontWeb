import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'

const Hospital = () => {
  const [hospitalName, setHospitalName] = useState('테스트병원')
  const [phone, setPhone] = useState('01012345678')
  const [crn, setCrn] = useState('1231213-123123')
  const [doctorName, setDoctorName] = useState('이동권')
  const [userId, setUserId] = useState('padzz321')
  const [password, setPassword] = useState('ehdrnjs11!')
  const [address, setAddress] = useState('충남 계룡시 장안1길 6 3층')
  const [introduction, setIntroduction] = useState( 
    '예를들어 이런 테스트 페이지 예시 입니다.',
  )

  const handleButton = async () => {
    console.log(process.env.REACT_APP_CREATEHOSPITAL)
    const data = {
      hospitalName,
      phone,
      crn,
      doctorName,
      userId,
      password,
      address,
      introduction,
    }
    await axios
      .post(process.env.REACT_APP_CREATEHOSPITAL, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <label>병원이름</label>
      <input />
      <label>전화번호</label>
      <input />
      <label>사업자등록번호</label>
      <input />
      <label>의사이름</label>
      <input />
      <label>아이디</label>
      <input />
      <label>비밀번호</label>
      <input />
      <label>주소</label>
      <input />
      <label>설명</label>
      <input />
      <button onClick={handleButton}>생성하기</button>
    </div>
  )
}
export default Hospital

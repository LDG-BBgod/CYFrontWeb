import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'

const Hospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: '테스트병원',
    phone: '01012345678',
    crn: '1231213-123123',
    doctorName: '이동권',
    userId: 'padzz321',
    password: 'ehdrnjs11!',
    address: '충남 계룡시 장안1길 6 3층',
    introduction: '예를들어 이런 테스트 페이지 예시 입니다.',
    images: [],
  })

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'images') {
      setFormData({ ...formData, [name]: files })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleButton = async () => {
    try {
      const imageFormData = new FormData()
      for (let i = 0; i < formData.images.length; i++) {
        imageFormData.append('images', formData.images[i])
      }
      imageFormData.append('jsonField', JSON.stringify(formData))
      // 아이디 존재 여부 체크 필수!!
      await axios
        .post(process.env.REACT_APP_CREATEHOSPITAL, imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res.data)
        })
    } catch (err) {
      console.log(err)
    }
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
      <label>이미지업로드</label>
      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleInputChange}
      />
      <button onClick={handleButton}>생성하기</button>
    </div>
  )
}
export default Hospital

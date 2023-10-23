// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'

// action

// api

// components
import Typography from '../../components/Typography'
import Spacer from '../../components/Spacer.js'
// common
import { gray2, gray4, gray5, gray6, gray7 } from '../../common'

const Account = () => {
  const [formData, setFormData] = useState({
    userId: window.sessionStorage.getItem('userId'),
    token: window.sessionStorage.getItem('token'),
    introduction: window.sessionStorage.getItem('introduction'),
    images1: null,
    images2: null,
    images3: null,
    imagesUrl1: null,
    imagesUrl2: null,
    imagesUrl3: null,
  })

  useEffect(() => {
    const test = async () => {
      const imgUrls = JSON.parse(window.sessionStorage.getItem('imageUrls'))
      const tempImages = []
      const tempImagesUrl = []
      for (let i = 0; i < imgUrls.length; i++) {
        const img = await axios.get(
          `${process.env.REACT_APP_BACKEND}${imgUrls[i]}`,
          {
            responseType: 'arraybuffer',
          },
        )
        const fileName = imgUrls[i].split('^')[imgUrls[i].split('^').length - 1]
        const blob = new Blob([img.data, { type: 'image/jpeg' }])
        const file = new File([blob], `${fileName}`, { type: 'image/jpeg' })
        if (file) {
          const imageUrl = URL.createObjectURL(file)
          tempImages.push(file)
          tempImagesUrl.push(imageUrl)
        }
      }
      setFormData({
        ...formData,
        images1: tempImages[0] || null,
        images2: tempImages[1] || null,
        images3: tempImages[2] || null,
        imagesUrl1: tempImagesUrl[0] || null,
        imagesUrl2: tempImagesUrl[1] || null,
        imagesUrl3: tempImagesUrl[2] || null,
      })
    }
    test()
  }, [])

  const handleImgClick = (i) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setFormData({
          ...formData,
          [`images${i}`]: file,
          [`imagesUrl${i}`]: imageUrl,
        })
      }
    }
    input.click()
  }
  const handleButton = async () => {
    console.log(formData)
    try {
      const reqFormData = new FormData()
      if (formData.images1) {
        reqFormData.append('images', formData.images1)
      }
      if (formData.images2) {
        reqFormData.append('images', formData.images2)
      }
      if (formData.images3) {
        reqFormData.append('images', formData.images3)
      }
      reqFormData.append('jsonField', JSON.stringify(formData))
      await axios
        .post(process.env.REACT_APP_UPDATEIMGINTROHOSPITAL, reqFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(async () => {
          const userType = window.sessionStorage.getItem('userType')
          const userId = window.sessionStorage.getItem('userId')
          const token = window.sessionStorage.getItem('token')

          await axios
            .post(
              userType === 'hospital'
                ? process.env.REACT_APP_READHOSPITAL
                : process.env.REACT_APP_READCENTER,
              { userId, token },
            )
            .then((res) => {
              window.sessionStorage.setItem(
                'introduction',
                res.data.msg.introduction,
              )
              window.sessionStorage.setItem(
                'imageUrls',
                JSON.stringify(res.data.msg.imageUrls),
              )
              alert('변경사항이 저장되었습니다.')
              window.location.reload()
            })
            .catch((err) => {
              console.error(err)
            })
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography fontSize={24} color={gray6}>
        계정관리
      </Typography>
      <Spacer space={80} />
      <CGrid>
        <CContent>
          <Typography fontSize={20} color={gray4}>
            병원명
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray7}>
            {window.sessionStorage.getItem('hospitalName')}
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray4}>
            사업자등록번호
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray7}>
            {window.sessionStorage.getItem('bn')}
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray4}>
            의사명
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray7}>
            {window.sessionStorage.getItem('doctorName')}
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray4}>
            관리ID수
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray7}>
            미정
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray4}>
            주소
          </Typography>
        </CContent>
        <CContent>
          <Typography fontSize={20} color={gray7}>
            {window.sessionStorage.getItem('address2')}
            {window.sessionStorage.getItem('address3')}
          </Typography>
        </CContent>
      </CGrid>
      <Spacer space={80} />
      <Typography fontSize={20} color={gray4}>
        병원소개글
      </Typography>
      <Spacer space={10} />
      <CTextArea
        maxLength={200}
        value={formData.introduction}
        onChange={(e) => {
          setFormData({ ...formData, introduction: e.target.value })
        }}
      />
      <Spacer space={30} />
      <Typography fontSize={20} color={gray4}>
        병원이미지(최대 3개)
      </Typography>
      <Spacer space={10} />
      <CImgGroup>
        <img
          src={formData.imagesUrl1 || '/img/addImg.svg'}
          alt="이미지추가"
          height={91}
          width={200}
          style={{ cursor: 'pointer', marginRight: 10, borderRadius: 10 }}
          onClick={() => handleImgClick(1)}
        />
        <img
          src={formData.imagesUrl2 || '/img/addImg.svg'}
          alt="이미지추가"
          height={91}
          width={200}
          style={{ cursor: 'pointer', marginRight: 10, borderRadius: 10 }}
          onClick={() => handleImgClick(2)}
        />
        <img
          src={formData.imagesUrl3 || '/img/addImg.svg'}
          alt="이미지추가"
          height={91}
          width={200}
          style={{ cursor: 'pointer', marginRight: 10, borderRadius: 10 }}
          onClick={() => handleImgClick(3)}
        />
      </CImgGroup>
      <Spacer space={8} />
      <Typography fontSize={14} color={gray2}>
        가장 앞의 이미지가 대표 이미지로 설정됩니다.
      </Typography>
      <Spacer space={20} />
      <button style={{ width: 200, height: 40 }} onClick={handleButton}>
        저장하기
      </button>
      <Spacer space={100} />
    </div>
  )
}
export default Account

const CGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 10px;
`
const CContent = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
`
const CTextArea = styled.textarea`
  box-sizing: border-box;
  min-height: 100px;
  width: 100%;
  border: none;
  background: ${gray5};
  border-radius: 10px;
  padding: 15px 10px;
  font-size: 20px;
  color: ${gray2};
  resize: none;
  line-height: 25px;
`
const CImgGroup = styled.div`
  display: flex;
  align-items: center;
`

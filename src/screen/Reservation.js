// module
import { useEffect, useState, useRef } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

// action
import {
  setIsOpen,
  setTitle,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../actions/modal'
// api

// components
import Spacer from '../components/Spacer'
import Typography from '../components/Typography'
import CYInput1 from '../components/CYInput1'
// common
import { gray1, gray3, gray4, gray6, gray7, white } from '../common'
import CYButton1 from '../components/CYButton1'

const commonLogic = (val) => {
  return val === ''
}

// 예약관리 메인섹션에 띄울 시간 배열 가져오기
const getTimeArr = (
  startTH,
  startTM,
  endTH,
  endTM,
  lunchSTH,
  lunchSTM,
  lunchETH,
  lunchETM,
  sectionTime,
) => {
  const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
  dayjs.extend(isSameOrAfter)

  let interval
  if (sectionTime === '30분마다 예약') interval = 30
  else if (sectionTime === '15분마다 예약') interval = 15
  else if (sectionTime === '10분마다 예약') interval = 10
  const startTime = dayjs()
    .set('hour', Number(startTH))
    .set('minute', Number(startTM))
  const endTime = dayjs()
    .set('hour', Number(endTH))
    .set('minute', Number(endTM))
  const exStartTime = dayjs()
    .set('hour', Number(lunchSTH))
    .set('minute', Number(lunchSTM))
  const exEndTime = dayjs()
    .set('hour', Number(lunchETH))
    .set('minute', Number(lunchETM))

  const timeArray = []
  let currentTime = startTime

  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    if (window.sessionStorage.getItem('skipLunch') === 'true') {
      timeArray.push(currentTime.format('HH:mm'))
      currentTime = currentTime.add(interval, 'minute')
    } else {
      if (
        !(
          currentTime.isSameOrAfter(exStartTime) &&
          currentTime.isBefore(exEndTime)
        )
      ) {
        timeArray.push(currentTime.format('HH:mm'))
      }
      currentTime = currentTime.add(interval, 'minute')
    }
  }
  return timeArray
}

// 예약된 데이터 백엔드에서 가져오기
const useGetRserveData = async ({ Y, M, D }) => {
  const [reserveArr, setReserveArr] = useState([])
  const OID = window.sessionStorage.getItem('OID')
  await axios
    .post(process.env.REACT_APP_RESERVE_READ, { OID, Y, M, D })
    .then((res) => {
      if (!res.data.err) {
        setReserveArr(res.data.msg.data)
      } else {
        alert('데이터를 불러오지 못하였습니다. 새로고침해주세요.')
      }
    })
    .catch((err) => {
      console.error(err)
    })
  return reserveArr
}

// 예약박스 컴포넌트
const RserveBox = ({ Y, M, D, time, setInfoState, setInfoData }) => {
  const [state, setState] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getRserveDate = async ({ Y, M, D }) => {
      const OID = window.sessionStorage.getItem('OID')
      await axios
        .post(process.env.REACT_APP_RESERVE_READ, { OID, Y, M, D })
        .then((res) => {
          if (!res.data.err) {
            const reserveArr = res.data.msg.data
            if (reserveArr.length !== 0) {
              reserveArr.forEach((element) => {
                if (element.time === time) {
                  setState(true)
                  setData(element)
                }
              })
            }
          } else {
            alert('데이터를 불러오지 못하였습니다. 새로고침해주세요.')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    getRserveDate({ Y, M, D })
  }, [])

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: 140,
        height: 100,
        backgroundColor: state ? '#BBE3D5' : '#fff',
        borderRadius: 5,
        cursor: 'pointer',
        boxShadow: '0px 4px 6px #DDD',
      }}
    >
      {state ? (
        <div
          style={{ boxSizing: 'border-box', padding: 10, height: '100%' }}
          onClick={() => {
            setInfoState('확인')
            setInfoData({
              Y,
              M,
              D,
              time,
            })
          }}
        >
          <Typography fontSize={14}>{time}</Typography>
          <Spacer space={10} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 50,
            }}
          >
            <Typography fontSize={14}>{data.name}</Typography>
            <Spacer space={4} />
            <Typography fontSize={14}>{data.birth}</Typography>
            <Spacer space={4} />
            <Typography fontSize={14}>{data.phone}</Typography>
          </div>
        </div>
      ) : (
        <div
          style={{ boxSizing: 'border-box', padding: 10, height: '100%' }}
          onClick={() => {
            setInfoState('예약')
            setInfoData({
              Y,
              M,
              D,
              time,
            })
          }}
        >
          <Typography fontSize={14}>{time}</Typography>
          <Spacer space={10} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 50,
            }}
          >
            <Typography fontSize={14}>예약없음</Typography>
          </div>
        </div>
      )}
    </div>
  )
}

// 오른쪽 영역 3가지상태(예약하기, 확인하기, 빈상태)
const InfoSection = ({ state, data }) => {
  const dispatch = useDispatch()
  const [reserveData, setReserveData] = useState({
    name: '',
    birth: '',
    phone: '',
  })
  const OID = window.sessionStorage.getItem('OID')
  useEffect(() => {
    console.log(state)
    if (state === '확인') {
      const getOneInfo = async () => {
        await axios
          .post(process.env.REACT_APP_RESERVE_READONE, {
            OID,
            Y: data.Y,
            M: data.M,
            D: data.D,
            time: data.time,
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      getOneInfo()
    }
  }, [state])
  if (state === '예약') {
    const handleName = (value) => {
      setReserveData({ ...reserveData, name: value })
    }
    const handleBirth = (value) => {
      setReserveData({ ...reserveData, birth: value })
    }
    const handlePhone = (value) => {
      setReserveData({ ...reserveData, phone: value })
    }

    const hnadleReserveButton = async () => {
      if (commonLogic(reserveData.name)) {
        alert('[예약자명]을 입력해주세요.')
      } else if (commonLogic(reserveData.birth)) {
        alert('[생년월일]을 입력해주세요.')
      }

      await axios
        .post(process.env.REACT_APP_RESERVE_CREATE, {
          OID,
          Y: data.Y,
          M: data.M,
          D: data.D,
          time: data.time,
          name: reserveData.name,
          birth: reserveData.birth,
          phone: reserveData.phone,
        })
        .then((res) => {
          if (!res.data.err) {
            batch(() => {
              dispatch(setIsOpen(true))
              dispatch(setTitle('예약이 등록되었습니다.'))
              dispatch(setContent('항목을 클릭 후 변경/취소가 가능합니다.'))
              dispatch(setButtonText('확 인'))
              dispatch(
                setButtonFunc(() => {
                  dispatch(close())
                  window.location.reload()
                }),
              )
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    return (
      <div
        style={{
          backgroundColor: white,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.M}월
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.D}일
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.time}
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            직접 입력하기
          </Typography>
        </div>

        <Spacer space={50} />

        <CYInput1
          title={'예약자명'}
          placeholer={'예약자 성함을 입력해주세요'}
          onValueChange={handleName}
        />
        <Spacer space={30} />
        <CYInput1
          title={'생년월일'}
          placeholer={'생년월일 8자리를 입력해주세요'}
          onValueChange={handleBirth}
        />
        <Spacer space={30} />
        <CYInput1
          title={'전화번호'}
          placeholer={'- 기호없이 입력해주세요'}
          onValueChange={handlePhone}
        />
        <div style={{ marginTop: 'auto' }}>
          <CYButton1
            text={'등록하기'}
            height={40}
            buttonFunc={hnadleReserveButton}
          />
        </div>
      </div>
    )
  } else if (state === '확인') {
    return (
      <div
        style={{
          backgroundColor: white,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.Y}년
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.M}월
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.D}일
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {data.time}
          </Typography>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <CYButton1 text={'취소하기'} height={40} buttonFunc={null} />
        </div>
      </div>
    )
  } else {
    return (
      <div
        style={{
          backgroundColor: white,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color={gray4}>예약 현황을 클릭해서</Typography>
        <Spacer space={5} />
        <Typography color={gray4}>자세한 예약내용을 확인하세요</Typography>
      </div>
    )
  }
}

const Reservation = () => {
  const dispatch = useDispatch()
  const [dateArr, setDateArr] = useState([])
  const [infoState, setInfoState] = useState('')
  const [infoData, setInfoData] = useState({})
  const [isSetted, setIsSetted] = useState(
    window.sessionStorage.getItem('timeSection'),
  )
  useEffect(() => {
    const isTimeSetting = window.sessionStorage.getItem('timeSection')
    if (isTimeSetting === '') {
      batch(() => {
        dispatch(setIsOpen(true))
        dispatch(setTitle('전화로만 예약이 가능합니다.'))
        dispatch(
          setContent(
            '예약관리 기능을 사용하시려면 [환경설정-예약관리]에서 설정을 완료해주세요. ',
          ),
        )
        dispatch(setButtonText('확 인'))
        dispatch(
          setButtonFunc(() => {
            dispatch(close())
            window.location.reload()
          }),
        )
      })
    }
  }, [])

  useEffect(() => {
    dayjs.locale('ko')
    const startDate = dayjs()
    const weekDates = Array.from({ length: 7 }, (_, index) => {
      const date = startDate.add(index, 'day')
      return {
        Y: date.year(),
        M: date.month() + 1,
        D: date.date(),
        day: date.format('ddd'),
      }
    })
    setDateArr(weekDates)
  }, [])

  return (
    <>
      {isSetted === '' ? (
        <CBody>환경설정-예약관리에 들어가셔서 설정을 완료해 주세요.</CBody>
      ) : (
        <CBody>
          <CContent>
            <div>
              {dateArr.map((value, index) => {
                // 토요일
                if (value.day === '토') {
                  const timeArr = getTimeArr(
                    `${window.sessionStorage.getItem('week1SH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week1SM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week1EH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week1EM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEM').slice(0, -1)}`,
                    window.sessionStorage.getItem('timeSection'),
                  )
                  return (
                    <div key={index}>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.Y}년
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.M}월
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.D}일
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          ({value.day})
                        </Typography>
                      </div>
                      <Spacer space={10} />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {timeArr.map((timeVal, index) => {
                          return (
                            <div
                              key={index}
                              style={{ margin: '0 15px 15px 0' }}
                            >
                              <RserveBox
                                time={timeVal}
                                Y={value.Y}
                                M={value.M}
                                D={value.D}
                                setInfoData={setInfoData}
                                setInfoState={setInfoState}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                  // 일요일
                } else if (value.day === '일') {
                  const timeArr = getTimeArr(
                    `${window.sessionStorage.getItem('week2SH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week2SM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week2EH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('week2EM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEM').slice(0, -1)}`,
                    window.sessionStorage.getItem('timeSection'),
                  )
                  return (
                    <div key={index}>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.Y}년
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.M}월
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.D}일
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          ({value.day})
                        </Typography>
                      </div>
                      <Spacer space={10} />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {timeArr.map((timeVal, index) => {
                          return (
                            <div
                              key={index}
                              style={{ margin: '0 15px 15px 0' }}
                            >
                              <RserveBox
                                time={timeVal}
                                Y={value.Y}
                                M={value.M}
                                D={value.D}
                                setInfoData={setInfoData}
                                setInfoState={setInfoState}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                  // 평일
                } else {
                  const timeArr = getTimeArr(
                    `${window.sessionStorage.getItem('daySH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('daySM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('dayEH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('dayEM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchSM').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEH').slice(0, -1)}`,
                    `${window.sessionStorage.getItem('lunchEM').slice(0, -1)}`,
                    window.sessionStorage.getItem('timeSection'),
                  )
                  return (
                    <div key={index}>
                      <div style={{ display: 'flex' }}>
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.Y}년
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.M}월
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          {value.D}일
                        </Typography>
                        <Spacer horizontal={false} space={5} />
                        <Typography
                          fontSize={14}
                          color={gray6}
                          fontWeight={'bold'}
                        >
                          ({value.day})
                        </Typography>
                      </div>
                      <Spacer space={10} />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {timeArr.map((timeVal, index) => {
                          return (
                            <div
                              key={index}
                              style={{ margin: '0 15px 15px 0' }}
                            >
                              <RserveBox
                                time={timeVal}
                                Y={value.Y}
                                M={value.M}
                                D={value.D}
                                setInfoData={setInfoData}
                                setInfoState={setInfoState}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </CContent>
          <div></div>
          <InfoSection state={infoState} data={infoData} />
        </CBody>
      )}
    </>
  )
}
export default Reservation

const CBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  height: calc(100% - 67px);
  display: grid;
  grid-template-columns: 1fr 10px 350px;
`
const CContent = styled.div`
  padding: 20px;
  background: ${white};
  overflow: auto;
`

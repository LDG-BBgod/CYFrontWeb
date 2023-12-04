// module
import { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
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
import CYLoading from '../components/CYLoading.js'
// common
import { gray1, gray3, gray4, gray6, gray7, white } from '../common'
import CYButton1 from '../components/CYButton1'
import CYButton2 from '../components/CYButton2.js'
const commonLogic = (val) => {
  return val === ''
}

////////////////////////////////////
// 해당 요일의 시간 배열 생성 함수 //
////////////////////////////////////
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

  while (currentTime.isBefore(endTime)) {
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

////////////////////////////////////////////////////////////
// 일주일 날짜 배열 생성 및 예약환자 데이터 가져오는 함수  //
////////////////////////////////////////////////////////////

const getDateAndReserveArr = async (fetchingCount) => {
  dayjs.locale('ko')
  const startDate = dayjs().add(fetchingCount, 'day')
  // 일주일 배열 생성
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = startDate.add(index, 'day')
    return {
      Y: date.year(),
      M: date.month() + 1,
      D: date.date(),
      day: date.format('ddd'),
    }
  })
  // 일주일 예약환자 가져오기
  const reserveData = await getRserveData({
    Y: startDate.year(),
    M: startDate.month() + 1,
    D: startDate.date(),
  })

  return [weekDates, reserveData]
}
const getRserveData = async ({ Y, M, D }) => {
  const OID = window.sessionStorage.getItem('OID')
  const reservation = await axios
    .post(process.env.REACT_APP_RESERVE_READ, { OID, Y, M, D })
    .catch((err) => {
      console.error(err)
    })
  return reservation.data.msg.reserve
}

////////////////////////////////////////
// 시간대별 예약표시박스 컴포넌튼 //
////////////////////////////////////////

const ReserveBox = ({
  state,
  date,
  time,
  reserveData,
  setReqData,
  setResData,
  setStatus,
}) => {
  const handleReservedClick = async () => {
    const OID = window.sessionStorage.getItem('OID')
    await axios
      .post(process.env.REACT_APP_RESERVE_READONE, {
        OID,
        Y: date.Y,
        M: date.M,
        D: date.D,
        time,
      })
      .then((res) => {
        setStatus('확인')
        setReqData({
          date,
          time,
        })
        setResData(res.data.msg)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const handleNotReservedClick = () => {
    setStatus('예약')
    setReqData({
      date,
      time,
    })
  }

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
        margin: '0 15px 15px 0',
      }}
    >
      {state ? (
        <div
          style={{ boxSizing: 'border-box', padding: 10, height: '100%' }}
          onClick={handleReservedClick}
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
            <Typography fontSize={14}>{reserveData.name}</Typography>
            <Spacer space={4} />
            <Typography fontSize={14}>{reserveData.birth}</Typography>
            <Spacer space={4} />
            <Typography fontSize={14}>{reserveData.phone}</Typography>
          </div>
        </div>
      ) : (
        <div
          style={{ boxSizing: 'border-box', padding: 10, height: '100%' }}
          onClick={handleNotReservedClick}
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

////////////////////////////////////////
// 예약된 날짜인지 판별 함수 //
////////////////////////////////////////

const isReserved = (date, time, reserveArr) => {
  const dateTimeStr = `${date.Y}-${date.M}-${date.D} ${time}`
  for (const reservation of reserveArr) {
    const reservationDateTimeStr = `${new Date(
      reservation.date,
    ).getFullYear()}-${new Date(reservation.date).getMonth() + 1}-${new Date(
      reservation.date,
    ).getDate()} ${reservation.time}`
    if (dateTimeStr === reservationDateTimeStr) {
      return [true, reservation]
    }
  }
  return [false, null]
}

////////////////////////////////////////
// Info영역 3가지상태(예약, 확인, 기본) //
////////////////////////////////////////

const InfoSection = ({ status, reqData, resData }) => {
  const dispatch = useDispatch()
  const initState = {
    name: '',
    birth: '',
    phone: '',
  }
  const [reserveData, setReserveData] = useState(initState)

  // 예약하기
  if (status === '예약') {
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
      } else if (commonLogic(reserveData.phone)) {
        alert('[전화번호]를 입력해주세요.')
      } else {
        const OID = window.sessionStorage.getItem('OID')
        await axios
          .post(process.env.REACT_APP_RESERVE_CREATE, {
            OID,
            Y: reqData.date.Y,
            M: reqData.date.M,
            D: reqData.date.D,
            time: reqData.time,
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
    }
    return (
      <CInfoBox1>
        <div style={{ display: 'flex' }}>
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.date.M}월
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.date.D}일
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.time}
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
      </CInfoBox1>
    )

    // 확인하기
  } else if (status === '확인') {
    const handleCancleButton = async () => {
      const OID = window.sessionStorage.getItem('OID')
      await axios
        .post(process.env.REACT_APP_RESERVE_DELETE, {
          OID,
          Y: reqData.date.Y,
          M: reqData.date.M,
          D: reqData.date.D,
          time: reqData.time,
        })
        .then((res) => {
          if (!res.data.err) {
            batch(() => {
              dispatch(setIsOpen(true))
              dispatch(setTitle('예약이 취소되었습니다.'))
              dispatch(setContent('새로운 예약을 등록하세요.'))
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
      <CInfoBox1>
        <div style={{ display: 'flex' }}>
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.date.M}월
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.date.D}일
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            {reqData.time}
          </Typography>
          <Spacer horizontal={false} space={5} />
          <Typography fontSize={20} fontWeight={'bold'}>
            예약
          </Typography>
        </div>

        <Spacer space={50} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={16} color={gray4}>
            예약자명
          </Typography>
          <Typography fontSize={16}>{resData.name}</Typography>
        </div>
        <Spacer space={35} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={16} color={gray4}>
            생년월일
          </Typography>
          <Typography fontSize={16}>{resData.birth}</Typography>
        </div>
        <Spacer space={35} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={16} color={gray4}>
            전화번호
          </Typography>
          <Typography fontSize={16}>{resData.phone}</Typography>
        </div>
        <Spacer space={35} />
        <Typography fontSize={16} color={gray4}>
          이전 예약 기록
        </Typography>
        <Spacer space={15} />
        <CPrevReservation>
          <Typography fontSize={16}>이전기록데이터 예정</Typography>
        </CPrevReservation>
        <div style={{ marginTop: 'auto' }}>
          <CYButton2
            text={'예약 취소'}
            height={40}
            buttonFunc={handleCancleButton}
          />
        </div>
      </CInfoBox1>
    )

    //빈화면
  } else {
    return (
      <CInfoBox2>
        <Typography color={gray4}>예약 현황을 클릭해서</Typography>
        <Spacer space={5} />
        <Typography color={gray4}>자세한 예약내용을 확인하세요</Typography>
      </CInfoBox2>
    )
  }
}

////////////////////////////////////////
// 요일(7일) 제목 표시 컴포넌트 //
////////////////////////////////////////
const CTitle = ({ Y, M, D, day }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Typography fontSize={16} color={gray6} fontWeight={'bold'}>
        {Y}년
      </Typography>
      <Spacer horizontal={false} space={5} />
      <Typography fontSize={16} color={gray6} fontWeight={'bold'}>
        {M}월
      </Typography>
      <Spacer horizontal={false} space={5} />
      <Typography fontSize={16} color={gray6} fontWeight={'bold'}>
        {D}일
      </Typography>
      <Spacer horizontal={false} space={5} />
      <Typography fontSize={16} color={gray6} fontWeight={'bold'}>
        ({day})
      </Typography>
    </div>
  )
}
////////////////////////////////////////
// MAIN //
////////////////////////////////////////
const Reservation = () => {
  const dispatch = useDispatch()
  const [ref, inView] = useInView()
  const [isInit, setIsInit] = useState(true)
  const [hospitalData, setHospitalData] = useState({})
  const [dateArr, setDateArr] = useState([])
  const [reserveArr, setReserveArr] = useState([])
  const [status, setStatus] = useState('기본')
  const [reqData, setReqData] = useState({})
  const [resData, setResData] = useState({})
  const [fetchingCount, setFetchingCount] = useState(0)

  // 무한스크롤 옵져버 셋팅
  const fetchData = async (addNum) => {
    getDateAndReserveArr(addNum).then((result) => {
      setDateArr(dateArr.concat(result[0]))
      setReserveArr(reserveArr.concat(result[1]))
    })
  }
  useEffect(() => {
    if (inView) {
      setFetchingCount(fetchingCount + 7)
      fetchData(fetchingCount + 7)
    }
  }, [inView])

  // 예약관리페이지 Init
  useEffect(() => {
    const getHospitalInfo = async () => {
      const OID = window.sessionStorage.getItem('OID')
      await axios
        .post(process.env.REACT_APP_HOSPITAL_READ, { OID })
        .then((res) => {
          if (res.data.msg.isReserveSetted === 'false') {
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
                  window.location.href = '/dashboard/welcome'
                }),
              )
            })
          } else {
            setHospitalData(res.data.msg)
            getDateAndReserveArr(fetchingCount).then((result) => {
              setDateArr(result[0])
              setReserveArr(result[1])
              setIsInit(false)
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    getHospitalInfo()
  }, [])

  return (
    <>
      {isInit ? (
        <CBody>
          <CContent></CContent>
          <div></div>
          <InfoSection status={status} reqData={reqData} resData={resData} />
        </CBody>
      ) : (
        <CBody>
          <CContent>
            {dateArr.map((value, index) => {
              if (value.day === '토') {
                let timeArr = []
                if (window.sessionStorage.getItem('skipWeek1') !== 'true') {
                  timeArr = getTimeArr(
                    hospitalData.week1SH.slice(0, -1),
                    hospitalData.week1SM.slice(0, -1),
                    hospitalData.week1EH.slice(0, -1),
                    hospitalData.week1EM.slice(0, -1),
                    hospitalData.lunchSH.slice(0, -1),
                    hospitalData.lunchSM.slice(0, -1),
                    hospitalData.lunchEH.slice(0, -1),
                    hospitalData.lunchEM.slice(0, -1),
                    hospitalData.timeSection,
                  )
                  return (
                    <div key={index}>
                      <CTitle
                        Y={value.Y}
                        M={value.M}
                        D={value.D}
                        day={value.day}
                      />
                      <Spacer space={10} />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {timeArr.map((time, index) => {
                          const [state, reserveData] = isReserved(
                            value,
                            time,
                            reserveArr,
                          )
                          return (
                            <ReserveBox
                              key={index}
                              state={state}
                              date={value}
                              time={time}
                              reserveData={reserveData}
                              setReqData={setReqData}
                              setResData={setResData}
                              setStatus={setStatus}
                            />
                          )
                        })}
                      </div>
                      <Spacer space={20} />
                    </div>
                  )
                } else {
                  return <div key={index}></div>
                }
              } else if (value.day === '일') {
                let timeArr = []
                if (window.sessionStorage.getItem('skipWeek2') !== 'true') {
                  timeArr = getTimeArr(
                    hospitalData.week2SH.slice(0, -1),
                    hospitalData.week2SM.slice(0, -1),
                    hospitalData.week2EH.slice(0, -1),
                    hospitalData.week2EM.slice(0, -1),
                    hospitalData.lunchSH.slice(0, -1),
                    hospitalData.lunchSM.slice(0, -1),
                    hospitalData.lunchEH.slice(0, -1),
                    hospitalData.lunchEM.slice(0, -1),
                    hospitalData.timeSection,
                  )
                  return (
                    <div key={index}>
                      <CTitle
                        Y={value.Y}
                        M={value.M}
                        D={value.D}
                        day={value.day}
                      />
                      <Spacer space={10} />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {timeArr.map((time, index) => {
                          const [state, reserveData] = isReserved(
                            value,
                            time,
                            reserveArr,
                          )
                          return (
                            <ReserveBox
                              key={index}
                              state={state}
                              date={value}
                              time={time}
                              reserveData={reserveData}
                              setReqData={setReqData}
                              setResData={setResData}
                              setStatus={setStatus}
                            />
                          )
                        })}
                      </div>
                      <Spacer space={20} />
                    </div>
                  )
                } else {
                  return <div key={index}></div>
                }
              } else {
                const timeArr = getTimeArr(
                  hospitalData.daySH.slice(0, -1),
                  hospitalData.daySM.slice(0, -1),
                  hospitalData.dayEH.slice(0, -1),
                  hospitalData.dayEM.slice(0, -1),
                  hospitalData.lunchSH.slice(0, -1),
                  hospitalData.lunchSM.slice(0, -1),
                  hospitalData.lunchEH.slice(0, -1),
                  hospitalData.lunchEM.slice(0, -1),
                  hospitalData.timeSection,
                )
                return (
                  <div key={index}>
                    <CTitle
                      Y={value.Y}
                      M={value.M}
                      D={value.D}
                      day={value.day}
                    />
                    <Spacer space={10} />
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {timeArr.map((time, index) => {
                        const [state, reserveData] = isReserved(
                          value,
                          time,
                          reserveArr,
                        )
                        return (
                          <ReserveBox
                            key={index}
                            state={state}
                            date={value}
                            time={time}
                            reserveData={reserveData}
                            setReqData={setReqData}
                            setResData={setResData}
                            setStatus={setStatus}
                          />
                        )
                      })}
                    </div>
                    <Spacer space={20} />
                  </div>
                )
              }
            })}
            <div style={{}} ref={ref}></div>
          </CContent>
          <div></div>
          <InfoSection status={status} reqData={reqData} resData={resData} />
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
const CInfoBox1 = styled.div`
  background-color: ${white};
  padding: 20px;
  display: flex;
  flex-direction: column;
`
const CInfoBox2 = styled.div`
  background-color: ${white};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CPrevReservation = styled.div`
  height: 40px;
  width: 100%;
  background-color: #bbe3d5;
  line-height: 40px;
  border-radius: 3px;
  text-align: center;
`

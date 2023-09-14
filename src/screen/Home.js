import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'

import Spacer from '../components/Spacer.js'

const Home = () => {
  const handleTemp = () => {
    alert('서비스 준비중입니다.')
  }
  const handleButton = async () => {
    await axios
      .post(process.env.REACT_APP_CREATEHOSPITAL)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <MainPadding>
      <Header>
        <img src="/img/logo_green.svg" alt="로고" height={75} width={108} />
        <Nav onClick={handleTemp} style={{ marginLeft: 'auto' }}>
          ABOUT
        </Nav>
        <Nav onClick={handleTemp}>VISION</Nav>
        <Nav onClick={handleTemp}>CURRENT</Nav>
        <Nav onClick={handleTemp}>CONTACT</Nav>
      </Header>
      <Spacer space={40} />
      <section>
        <AppDownButton style={{ marginLeft: 'auto' }} onClick={handleTemp}>
          <span style={{ fontSize: 20 }}>App DownLoad</span>
          <Spacer horizontal={false} space={20} />
          <img src="/img/download.svg" alt="다운로드" height={25} width={25} />
        </AppDownButton>
        <Spacer space={200} />
        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#3caf87' }}>
          건강한 정신으로 더 나은 삶을 돕는다는 각오
        </div>
        <Spacer space={20} />
        <div style={{ fontSize: 40, color: '#707070' }}>
          모든 정신질환 환우들의 든든한 동반자
        </div>
        <Spacer space={10} />
        <div style={{ fontSize: 40, color: '#707070' }}>
          <span style={{ color: '#3caf87' }}>치윰</span>입니다.
        </div>
      </section>
      <section>
        <Spacer space={600} />
        <Title>정신질환의 완벽한 치료에 도움이 되는 것에 집중합니다.</Title>
        <Spacer space={20} />
        <Content>
          대한민국의 국민 네명 중 한명은 어떤 형태의 질환이든 정신질환을 가지게
          된다고 합니다.
          <br />
          치윰은 대한민국의 국민들이 정신질환을 가지더라고 빠르고 확실히 나을 수
          있는 방법에 집중하여
          <br />
          건강한 세상을 만들어 나가겠습니다.
        </Content>
        <Spacer space={600} />
        <div style={{ textAlign: 'right' }}>
          <Title>정신질환의 완벽한 치료에 도움이 되는 것에 집중합니다.</Title>
          <Spacer space={20} />
          <Content>
            빠른 완치와 건강한 일상으로의 복귀를 위하여 최고의 전문가들이
            <br />
            도움이 필요한 모두에게 진심으로 다가갑니다.
          </Content>
        </div>
        <Spacer space={600} />
        <Title>항상 환자 편에서 생각니다.</Title>
        <Spacer space={20} />
        <Content>
          치윰은 어떻게 하면 대한민국의 정신질환 진료 시스템을 이용할 수 있을까
          라는 생각에서 시작했습니다.
          <br />
          환자의 입장에서 생각하며, 서비스를 만들고, 함께 극복해나가는 모두의
          든든한 파트너가 되겠습니다.
        </Content>
        <Spacer space={300} />
      </section>
      <section
        style={{
          backgroundColor: '#F6F6F6',
          marginLeft: -200,
          marginRight: -200,
          padding: 200,
        }}
      >
        <div style={{ fontSize: 50 }}>치윰 현황</div>
        <Spacer space={50} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="/img/stick.svg" alt="스틱" height={400} />
          <Spacer horizontal={false} space={50} />
          <div>
            <StickContent>- 05. 02. 주식회사 치윰 설립</StickContent>
            <StickContent>- 2023년 예비창업패키지 지원사업 선정</StickContent>
            <StickContent>- 2023년 과학벨트 창업성장지원사업 선정</StickContent>
            <StickContent>
              - (재)청년상인육성재단 지원사업 콘텐츠 제작 참여
            </StickContent>
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 200, paddingBottom: 100 }}>
        <div style={{ fontSize: 50 }}>문의</div>
        <Spacer space={20} />
        <div style={{ color: '#707070', fontSize: 20 }}>
          언제든 치윰에 문의해주세요.
        </div>
        <Spacer space={100} />
        <InputTitle>이메일</InputTitle>
        <CSInput style={{ height: 40 }} />
        <Spacer space={20} />
        <InputTitle>문의 제목</InputTitle>
        <CSInput style={{ height: 40 }} />
        <Spacer space={20} />
        <InputTitle>문의 내용</InputTitle>
        <textarea
          style={{
            boxSizing: 'border-box',
            width: '100%',
            paddingTop: 10,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: '#707070',
            borderRadius: 10,
            fontSize: 20,
            resize: 'none',
            height: 300,
          }}
        />
        <Spacer space={20} />
        <CSButton onClick={handleTemp}>제출하기</CSButton>
      </section>
      <footer
        style={{
          backgroundColor: '#F6F6F6',
          marginLeft: -200,
          marginRight: -200,
          padding: 50,
          paddingLeft: 200,
          paddingRight: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src="/img/logo_green.svg" alt="로고" height={70} />
        <Spacer horizontal={false} space={50} />
        <div>
          <FooterText>
            <span>상호명 : </span>
            <span style={{ color: '#707070' }}>주식회사 치윰</span>
          </FooterText>
          <FooterText>
            <span>사업자등록번호 : </span>
            <span style={{ color: '#707070' }}>823-81-02958</span>
          </FooterText>
          <FooterText>
            <span>대표자 : </span>
            <span style={{ color: '#707070' }}>황원덕</span>
          </FooterText>
          <FooterText>
            <span>주소 : </span>
            <span style={{ color: '#707070' }}>
              세종특별자치시 나성북1로 22, 5층 (주)치윰
            </span>
          </FooterText>
        </div>
      </footer>
    </MainPadding>
  )
}

export default Home

const MainPadding = styled.div`
  box-sizing: border-box;
  padding: 0 200px;
`
const Header = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
`
const Nav = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #707070;
  padding-left: 50px;
  cursor: pointer;
`
const AppDownButton = styled.button`
  width: 250px;
  height: 55px;
  border-radius: 10px;
  background-color: #3caf87;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`
const Content = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: #707070;
`
const StickContent = styled.div`
  font-size: 20px;
  line-height: 60px;
  color: #000;
`
const InputTitle = styled.div`
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
`
const CSInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding-left: 10px;
  border: solid 1px #707070;
  border-radius: 10px;
  font-size: 20px;
`
const CSButton = styled.button`
  margin-left: auto;
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #3caf87;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`
const FooterText = styled.div`
  font-size: 12px;
  line-height: 24px;
`

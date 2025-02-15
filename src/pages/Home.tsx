import styled from "styled-components";

const Home = () => {
  return (
    <Title>
      <div>
        <p>인텔리픽 | IT인재 채용 전문 플랫폼</p>
        <SubTitle>감사합니다.</SubTitle>
      </div>
    </Title>
  );
};

const Title = styled.p`
  display: flex;
  flex-direction: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 350px;
  font-size: 40px;
  color: #b851db;
`;
const SubTitle = styled.p`
  display: flex;
  flex-direction: center;
  justify-content: center;
`;
export default Home;

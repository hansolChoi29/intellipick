import styled from "styled-components";
import "./App.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <Container>
      <Button onClick={handleSignIn}>Start</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Button = styled.button`
  padding: 40px 50px;
  font-size: 50px;
  cursor: pointer;
  background-color: #b3916a;
  color: white;
  border: none;
  border-radius: 25px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ffffff;
    color: #b3916a;
    transform: scale(1.1);
  }
`;
export default App;

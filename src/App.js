import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function App() {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/sign-in");
    };
    return (_jsx(_Fragment, { children: _jsxs(Container, { children: [_jsx(ContainerTitle, { children: _jsx(Title, { children: "IntelliPick" }) }), _jsx(Button, { onClick: handleSignIn, children: "Start" })] }) }));
}
const Container = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 20px;
`;
const Button = styled.button `
  padding: 30px 40px;
  font-size: 30px;
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
const Title = styled.p `
  font-size: 24px;
  display: flex;
  justify-content: center;
`;
const ContainerTitle = styled.div `
  margin-bottom: 20px;
`;
export default App;

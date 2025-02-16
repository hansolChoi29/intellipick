import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Home = () => {
    return (_jsx(Title, { children: _jsxs("div", { children: [_jsx("p", { children: "\uC778\uD154\uB9AC\uD53D | IT\uC778\uC7AC \uCC44\uC6A9 \uC804\uBB38 \uD50C\uB7AB\uD3FC" }), _jsx(SubTitle, { children: "\uAC10\uC0AC\uD569\uB2C8\uB2E4." })] }) }));
};
const Title = styled.p `
  display: flex;
  flex-direction: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 350px;
  font-size: 40px;
  color: #b851db;
`;
const SubTitle = styled.p `
  display: flex;
  flex-direction: center;
  justify-content: center;
`;
export default Home;

import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Header = ({ isAuthenticated, signOut }) => {
    return (_jsx(Container, { children: _jsx("nav", { children: !isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(LinkButton, { to: "/home", children: "\uD648" }), _jsx(LinkButton, { to: "/sign-in", children: "\uB85C\uADF8\uC778" }), _jsx(LinkButton, { to: "/sign-up", children: "\uD68C\uC6D0\uAC00\uC785" })] })) : (_jsxs(_Fragment, { children: [_jsx(LinkButton, { to: "/dashboard", children: "\uB9C8\uC774\uD398\uC774\uC9C0" }), _jsx(LinkButton, { to: "/home", children: "\uD648" }), _jsx(LinkButton, { to: "/todolist", children: "Todo" }), _jsx(SignOutButton, { className: "bg-transparent border-none", onClick: signOut, children: "\uB85C\uADF8\uC544\uC6C3" }), " "] })) }) }));
};
const Container = styled.header `
  position: fixed;
  top: 0;
  right: 50px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  z-index: 1000;
`;
const SignOutButton = styled.button `
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
  font-size: 17px;
`;
const LinkButton = styled(Link) `
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: red;
  }
  margin-right: 10px;
  font-size: 17px;
`;
export default Header;

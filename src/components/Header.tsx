import { Link } from "react-router-dom";
import styled from "styled-components";
interface HeaderProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

const Header = ({ isAuthenticated, signOut }: HeaderProps) => {
  return (
    <Container>
      <nav>
        {!isAuthenticated ? (
          <>
            <LinkButton to="/sign-in">로그인</LinkButton>

            <LinkButton to="/sign-up">회원가입</LinkButton>
          </>
        ) : (
          <>
            <LinkButton to="/dashboard">마이페이지</LinkButton>
            <LinkButton to="/Home">홈</LinkButton>
            <SignOutButton
              className="bg-transparent border-none"
              onClick={signOut}
            >
              로그아웃
            </SignOutButton>{" "}
          </>
        )}
      </nav>
    </Container>
  );
};
const Container = styled.header`
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
const SignOutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
  font-size: 17px;
`;
const LinkButton = styled(Link)`
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

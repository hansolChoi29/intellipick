import { Link } from "react-router-dom";
interface HeaderProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

const Header = ({ isAuthenticated, signOut }: HeaderProps) => {
  return (
    <header>
      <nav>
        <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/sign-in">로그인</Link>
              </li>
              <li>
                <Link to="/sign-up">회원가입</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">마이페이지</Link>
              </li>
              <li>
                <Link to="/Home">홈</Link>
              </li>
              <li>
                <button onClick={signOut}>로그아웃</button>{" "}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
interface HeaderProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

const Header = ({ isAuthenticated, signOut }: HeaderProps) => {
  return (
    <header>
      <nav>
        {!isAuthenticated ? (
          <>
            <Link to="/sign-in">로그인</Link>

            <Link to="/sign-up">회원가입</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">마이페이지</Link>
            <Link to="/Home">홈</Link>
            <button className="bg-transparent border-none" onClick={signOut}>
              로그아웃
            </button>{" "}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

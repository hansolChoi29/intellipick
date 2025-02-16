import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessages } from "../types/auth";

import useAuthStore from "../store/authStore";
import styled from "styled-components";
import { setUser } from "@sentry/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setIsAuthenticated, isAuthenticated, signOut } = useAuthStore();
  const [error, setError] = useState<ErrorMessages>({});
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors: ErrorMessages = {};
    setError({}); // 기존 에러 초기화

    // 이메일과 비밀번호가 비어있는지 체크
    if (!email.trim()) {
      formErrors.email = "이메일 주소를 입력하세요.";
    }
    if (!password.trim()) {
      formErrors.password = "비밀번호를 입력하세요.";
    }

    // 에러가 있으면 리턴
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    try {
      // 서버에 로그인 요청 보내기
      const response = await fetch("http://localhost:5000/sign-in", {
        method: "POST", // 'POST' 방식으로 요청
        headers: {
          "Content-Type": "application/json", // JSON 형식
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          id: data.user.id,
          email: data.user.email,
        });
        setIsAuthenticated(true);
        console.log("Login successful, state updated:", data.user);
        alert("로그인성공! 마이페이지로 이동됩니다.");
        navigate("/dashboard");
      } else {
        setError({ general: data.message || "로그인 실패" });
      }
    } catch (err) {
      setError({ general: "서버 오류" });
      console.error("Error:", err);
    }
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title className="text-red-500 text-[200px]">로그인</Title>
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={handleChange}
        />
        {error.email && <ErrorText>{error.email}</ErrorText>}
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={handleChange}
        />{" "}
        {error.password && <ErrorText>{error.password}</ErrorText>}
        {isAuthenticated ? (
          <div>
            <p>환영합니다, {user?.email}님!</p>
            <button type="button" onClick={signOut}>
              로그아웃
            </button>
          </div>
        ) : (
          <SubmitButton type="submit">로그인</SubmitButton>
        )}
        <SignUpButton onClick={handleSignUp}>계정이 없으신가요?</SignUpButton>
      </Form>
    </Container>
  );
};
const Title = styled.p`
  font-size: 18px;
  margin-bottom: 100px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;
const Input = styled.input`
  padding: 19px;
  margin-bottom: 12px;
  border: 1px solid 4px;
  font-size: 16px;
  border-radius: 10px;
`;
const SignUpButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: transparent;
  font-size: 14px;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const SubmitButton = styled.button`
  padding: 12px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  border-radius: 20px;

  transition: background-color 0.3s ease;
  &:hover {
    color: #b3916a;
    background-color: white;
  }
  background-color: #b3916a;
  color: white;
`;
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 20px;
`;
export default SignIn;

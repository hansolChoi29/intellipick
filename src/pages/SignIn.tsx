import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import styled from "styled-components";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(`로그인실패!:${error.message}`);
        return;
      }
      if (data?.user) {
        const user = {
          id: data.user.id,
          email: data.user.email as string,
          nickname: data.user.user_metadata?.nickname,
        };

        // 상태 업데이트
        useAuthStore.getState().setUser(user);
        useAuthStore.getState().setIsAuthenticated(true);

        alert("로그인성공! 홈페이지로 이동됩니다.");
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`예기치못한 오류: ${err.message}`);
      } else {
        setError("예기치못한 오류가 발생했습니다.");
      }
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
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

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
  padding: 12px;
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
    background-color: #dddddd;
  }
`;

export default SignIn;

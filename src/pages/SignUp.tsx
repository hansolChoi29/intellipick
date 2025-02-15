import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import styled from "styled-components";
import { ErrorMessages } from "../types/auth";

const SignUp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<ErrorMessages>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "email") setEmail(value);
    if (name == "password") setPassword(value);
    if (name == "confirmPassword") setConfirmPassword(value);
    if (name == "nickname") setNickname(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formErrors: ErrorMessages = {};
    if (!email.trim()) {
      formErrors.email = "이메일 주소를 입력하세요.";
    }
    if (!password.trim()) {
      formErrors.password = "비밀번호를를 입력하세요.";
    }
    if (!confirmPassword.trim()) {
      formErrors.confirmPassword = "비밀번호를 다시 확인해주세요.";
    }
    if (!nickname.trim()) {
      formErrors.nickname = "닉네임을 입력해주세요 않습니다.";
    }
    if (password !== confirmPassword) {
      formErrors.password = "비밀번호가 일치하지 않습니다.";
    }
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    // const { data: duplicateEmail, error: emailCheckError } = await supabase
    //   .from("users")
    //   .select("email")
    //   .eq("email", email);

    // if (emailCheckError) {
    //   console.error("Email Check Error:", emailCheckError.message);
    //   console.error("이메일 중복 확인 중 오류가 발생했습니다.");
    //   return;
    // }

    // if (duplicateEmail.length > 0) {
    //   console.error("이미 사용 중인 이메일입니다.");
    //   return;
    // }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign Up Error:", error.message);
      console.error(`회원가입 실패: ${error.message}`);
      setError({ general: "회원가입 실패: " + error.message });
      return;
    }

    if (data.user) {
      const userId = data.user.id;
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          nick_name: nickname,
          email: email,
        },
      ]);

      if (insertError) {
        console.error(`닉네임 저장 실패: ${insertError.message}`);
        setError({ general: "닉네임 저장 실패: " + insertError.message });
        return;
      }
      setUser(data.user);
      alert("회원가입 성공! 홈페이지로 이동됩니다.");
      navigate("/");
    }
  };

  const handleSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>

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
          />
          {error.password && <ErrorText>{error.password}</ErrorText>}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={handleChange}
          />
          {error.confirmPassword && (
            <ErrorText>{error.confirmPassword}</ErrorText>
          )}
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={handleChange}
          />
          {error.nickname && <ErrorText>{error.nickname}</ErrorText>}
          <SubmitButton type="submit">가입</SubmitButton>

          <SignInButton onClick={handleSignIn}>
            이미 계정이 있으신가요?
          </SignInButton>
        </Form>
      </Container>
    </>
  );
};
const Title = styled.p`
  font-size: 18px;
  margin-bottom: 100px;
`;
export default SignUp;
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
  border: 1px solid 4px;
  margin-bottom: 18px;

  font-size: 16px;
  border-radius: 10px;
`;
const SignInButton = styled.button`
  margin-top: px;
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
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 20px;
`;

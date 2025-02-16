import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabase";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState({});
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") setEmail(value);
    if (name == "password") setPassword(value);
    if (name == "confirmPassword") setConfirmPassword(value);
    if (name == "nickname") setNickname(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
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
      formErrors.nickname = "닉네임을 입력해주세요.";
    }
    if (password !== confirmPassword) {
      formErrors.password = "비밀번호가 일치하지 않습니다.";
    }
    if (password.length < 6) {
      formErrors.password = "비밀번호는 6자리 이상이어야 합니다.";
    }
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
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
      useAuthStore.getState().setUser({
        id: data.user.id,
        email: data.user.email,
        nickname: data.user.user_metadata?.nickname,
      });
      useAuthStore.getState().setIsAuthenticated(true);
      alert("회원가입 성공! 홈페이지로 이동됩니다.");
      navigate("/");
    }
  };
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  return _jsx(_Fragment, {
    children: _jsx(Container, {
      children: _jsxs(Form, {
        onSubmit: handleSubmit,
        children: [
          _jsx(Title, { children: "\uD68C\uC6D0\uAC00\uC785" }),
          _jsx(Input, {
            type: "email",
            name: "email",
            placeholder:
              "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
            value: email,
            onChange: handleChange,
          }),
          error.email && _jsx(ErrorText, { children: error.email }),
          _jsx(Input, {
            type: "password",
            name: "password",
            placeholder:
              "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
            value: password,
            onChange: handleChange,
          }),
          error.password && _jsx(ErrorText, { children: error.password }),
          _jsx(Input, {
            type: "password",
            name: "confirmPassword",
            placeholder:
              "\uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
            value: confirmPassword,
            onChange: handleChange,
          }),
          error.confirmPassword &&
            _jsx(ErrorText, { children: error.confirmPassword }),
          _jsx(Input, {
            type: "text",
            name: "nickname",
            placeholder:
              "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
            value: nickname,
            onChange: handleChange,
          }),
          error.nickname && _jsx(ErrorText, { children: error.nickname }),
          _jsx(SubmitButton, { type: "submit", children: "\uAC00\uC785" }),
          _jsx(SignInButton, {
            onClick: handleSignIn,
            children:
              "\uC774\uBBF8 \uACC4\uC815\uC774 \uC788\uC73C\uC2E0\uAC00\uC694?",
          }),
        ],
      }),
    }),
  });
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

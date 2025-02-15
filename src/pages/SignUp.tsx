import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

const SignUp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") setEmail(value);
    if (name == "password") setPassword(value);
    if (name == "confirmPassword") setConfirmPassword(value);
    if (name == "nickname") setNickname(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      console.error("이메일 주소를 입력하세요.");
      return;
    }
    if (!password.trim()) {
      console.error("비밀번호를 입력하세요.");
      return;
    }
    if (!confirmPassword.trim()) {
      console.error("비밀번호를 다시 확인해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      console.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const { data: duplicateEmail, error: emailCheckError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);

      if (emailCheckError) {
        console.error("Email Check Error:", emailCheckError.message);
        console.error("이메일 중복 확인 중 오류가 발생했습니다.");
        return;
      }

      if (duplicateEmail.length > 0) {
        console.error("이미 사용 중인 이메일입니다.");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Sign Up Error:", error.message);
        console.error(`회원가입 실패: ${error.message}`);
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
          return;
        }
        setUser(data.user);
        alert("회원가입 성공! 홈페이지로 이동됩니다.");
        navigate("/");
      }
    } catch (err) {
      console.error("회원가입 중 오류발생!", err.message);
    }
  };
  const handleSignIn = () => {
    navigate("/SignIn");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>회원가입</p>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력해 주세요."
          value={confirmPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해 주세요."
          value={nickname}
          onChange={handleChange}
        />
        <button type="submit">Join</button>
      </form>
      <button onClick={handleSignIn}>이미 계정이 있으신가요?</button>
    </>
  );
};
export default SignUp;

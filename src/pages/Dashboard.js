import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabase";
const Dashboard = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인 후 접근 가능합니다.");
      return;
    }
    if (isAuthenticated && !user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    }
  }, [user, isAuthenticated, setUser, setIsAuthenticated]);
  useEffect(() => {
    if (user && isAuthenticated) {
      fetchNickname();
    }
  }, [user, isAuthenticated]);
  const fetchNickname = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("nick_name")
          .eq("id", user.id)
          .single();
        if (error) {
          alert("닉네임을 불러오는 중 오류가 발생했습니다.");
        } else {
          setNickname(data?.nick_name || "");
          setNewNickname(data?.nick_name || "");
        }
      } catch (err) {
        console.error("Error fetching nickname:", err);
      }
    }
  };
  const updateNickname = async () => {
    if (user) {
      const { error } = await supabase
        .from("users")
        .update({ nick_name: newNickname })
        .eq("id", user.id);
      if (error) {
        console.error("닉네임 업데이트 오류", error);
        alert("닉네임 업데이트 중 오류가 발생했습니다.");
      } else {
        setNickname(newNickname);
        setIsEditing(false);
        alert("닉네임이 성공적으로 변경되었습니다.");
      }
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (newNickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    updateNickname();
  };
  const handleCancel = () => {
    setNewNickname(nickname);
    setIsEditing(false);
  };
  if (!isAuthenticated) {
    return _jsx("div", {
      children:
        "\uB85C\uADF8\uC778 \uD6C4 \uC811\uADFC \uAC00\uB2A5\uD569\uB2C8\uB2E4.",
    });
  }
  return _jsx(Container, {
    children: _jsxs("div", {
      children: [
        _jsx(Title, { children: "\uB0B4 \uD398\uC774\uC9C0" }),
        _jsx("form", {
          onSubmit: handleSave,
          children: _jsx(Content, {
            children: isEditing
              ? _jsxs(_Fragment, {
                  children: [
                    _jsx(Input, {
                      type: "text",
                      value: newNickname,
                      onChange: (e) => setNewNickname(e.target.value),
                      placeholder:
                        "\uC0C8\uB85C\uC6B4 \uB2C9\uB124\uC784\uC744 \uC785\uB825\uD558\uC138\uC694",
                    }),
                    _jsxs(ButtonContainer, {
                      children: [
                        _jsx(Button, {
                          type: "submit",
                          children: "\uC800\uC7A5",
                        }),
                        _jsx(Button, {
                          type: "button",
                          onClick: handleCancel,
                          $cancel: true,
                          children: "\uCDE8\uC18C",
                        }),
                      ],
                    }),
                  ],
                })
              : _jsxs(_Fragment, {
                  children: [
                    _jsx(Nickname, { children: nickname }),
                    _jsx(Button, {
                      type: "button",
                      onClick: handleEdit,
                      children: "\uC218\uC815",
                    }),
                  ],
                }),
          }),
        }),
      ],
    }),
  });
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
const Content = styled.div`
  text-align: center;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 300px;
  max-width: 400px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;
const Nickname = styled.p`
  margin-top: 90px;
  font-size: 20px;
  color: #555;
  margin-bottom: 1px;
`;
const Input = styled.input`
  padding: 10px;
  margin-top: 90px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: #b3916a;
    outline: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1px;
`;
const Button = styled.button`
  padding: 15px 28px;
  font-size: 19px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.$cancel ? "#534431" : "#b3916a")};
  color: white;
  transition: background-color 0.3s;
  margin-top: 90px;
  &:hover {
    background-color: ${(props) => (props.$cancel ? "white" : "white")};
    color: ${(props) => (props.$cancel ? "#534431" : "#b3916a")};
  }
`;
export default Dashboard;

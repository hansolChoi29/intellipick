import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import styled from "styled-components";

const Dashboard = () => {
  const [nickname, setNickname] = useState("퇴초마을");
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const fetchNickname = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("nick_name")
        .eq("id", user.id)
        .single();
      if (error) {
        console.error("닉네임 불러오기 오류", error);
        alert("닉넴을 불러오는 중 오류가 발생했습니다.");
      } else {
        setNickname(data.nick_name);
      }
    }
  };

  const updateNickname = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("users")
        .update({ nick_name: newNickname })
        .eq("id", user.id);

      if (error) {
        console.error("닉네임 업데이트 오류", error);
        alert("닉넥임 업데이트하는 중 오류 발생했습니다.");
      } else {
        setNickname(newNickname);
        setIsEditing(false);
        alert("닉네임이 성공적으로 변경되었습니다.");
      }
    }
  };

  const handleEdit = () => {
    setNickname(nickname);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
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

  useEffect(() => {
    fetchNickname();
  }, []);

  return (
    <form onSubmit={handleSave}>
      <Container>
        <div>
          <Title>내 페이지</Title>
          <Content>
            {isEditing ? (
              <>
                <Input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  placeholder="새로운 닉네임을 입력하세요"
                />
                <ButtonContainer>
                  <Button type="submit">저장</Button>
                  <Button type="button" onClick={handleCancel} cancel>
                    취소
                  </Button>
                </ButtonContainer>
              </>
            ) : (
              <>
                <Nickname>{nickname}</Nickname>
                <Button type="button" onClick={handleEdit}>
                  수정
                </Button>
              </>
            )}
          </Content>
        </div>
      </Container>
    </form>
  );
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

const Button = styled.button<{ cancel?: boolean }>`
  padding: 15px 28px;
  font-size: 19px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.cancel ? "#534431" : "#b3916a")};
  color: white;
  transition: background-color 0.3s;
  margin-top: 90px;
  &:hover {
    background-color: ${(props) => (props.cancel ? "white" : "white")};
    color: ${(props) => (props.cancel ? "#534431" : "#b3916a")};
  }
`;
export default Dashboard;

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

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
    setNickname("");
    setIsEditing(false);
  };

  useEffect(() => {
    fetchNickname();
  }, []);

  return (
    <form onSubmit={handleSave}>
      <p>내 페이지~</p>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <div>
            <button type="submit">저장</button>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{nickname}</p>
          <button type="button" onClick={handleEdit}>
            수정
          </button>
        </>
      )}
    </form>
  );
};

export default Dashboard;

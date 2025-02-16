const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // dotenv 로드

const app = express();

// 환경 변수 로드 확인
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

const supabaseUrl = process.env.SUPABASE_URL; // .env 파일에서 URL을 읽어옵니다.
const supabaseKey = process.env.SUPABASE_ANON_KEY; // .env 파일에서 API 키를 읽어옵니다.

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or API key is missing!");
  process.exit(1); // supabaseUrl이나 supabaseKey가 없으면 서버를 종료합니다.
}

const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트 생성

app.use(cors()); // CORS 활성화
app.use(express.json()); // JSON 요청 처리

// 로그인 처리 API
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(401).json({ message: error.message }); // 로그인 실패
    }

    res.json({
      message: "로그인 성공!",
      user: { id: data.user.id, email: data.user.email }, // 로그인 성공 시 응답
    });
  } catch (err) {
    res.status(500).json({ message: "서버 오류: " + err.message }); // 서버 오류
  }
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

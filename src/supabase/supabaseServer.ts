// src/supabase/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"; // dotenv 로드

dotenv.config(); // 환경 변수 로드

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or API key is missing!");
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트 생성

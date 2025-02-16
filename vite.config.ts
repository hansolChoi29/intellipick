import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/sign-in": "http://localhost:5000", // API 서버 주소로 프록시 설정
      // "/sign-up": "http://localhost:5000", // 다른 엔드포인트도 설정 가능
    },
  },
});

import axios from "axios";

// Axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: "https://api.example.com", // API의 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT를 axios 기본 헤더에 설정하는 함수
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers["Authorization"]; // 로그아웃 시 헤더에서 JWT 제거
  }
};

export default axiosClient;

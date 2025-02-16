module.exports = {
  preset: "ts-jest", // ts-jest를 사용하도록 설정
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // TypeScript 파일 처리
    "^.+\\.(js|jsx)$": "babel-jest", // JS 파일 처리
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // jest.setup.ts 설정
};

// jest.setup.ts
import { TextEncoder as TE, TextDecoder as TD } from "util";

// global 객체에 TextEncoder와 TextDecoder 설정 (타입을 명확히 지정)
(global as unknown as { TextEncoder: typeof TE }).TextEncoder = TE;
(global as unknown as { TextDecoder: typeof TD }).TextDecoder = TD;

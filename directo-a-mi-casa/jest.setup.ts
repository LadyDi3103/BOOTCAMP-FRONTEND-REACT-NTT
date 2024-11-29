import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

// Configurar TextEncoder y TextDecoder
global.TextDecoder = TextDecoder as any;
global.TextEncoder = TextEncoder as any;

import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";
import fetchMock from "jest-fetch-mock";

// Configurar TextEncoder y TextDecoder
global.TextDecoder = TextDecoder as any;
global.TextEncoder = TextEncoder as any;

// Activar el mock de fetch
fetchMock.enableMocks();
import { getUserData, login } from "../authService";



const mockFetch = (data: unknown, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      blob: () => Promise.resolve(data),
      clone: () => ({ ...response }),
      text: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

const originalConsoleError = console.error;

beforeEach(() => {
  global.fetch = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  jest.resetModules();
  global.fetch = fetch;
  console.error = originalConsoleError;
})


describe("AuthService", () => {
  it("should login successfully", async () => {
    const mockResponse = {
      token: "fakeToken",
      expiresIn: 3600,
      user: {
        username: "testuser",
        email: "testuser@example.com",
      },
    };
    mockFetch(mockResponse);

    const result = await login("username", "password");
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error on login failure", async () => {
    const mockErrorResponse = {
      message: "Invalid credentials",
    };
    mockFetch(mockErrorResponse, 401, false);

    await expect(login("username", "wrongpassword")).rejects.toThrow("Invalid credentials");
  });

  it("should get user data successfully", async () => {
    const mockResponse = {
      username: "testuser",
      email: "testuser@example.com",
    };
    mockFetch(mockResponse);

    const result = await getUserData("fakeToken");
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error on getUserData failure", async () => {
    const mockErrorResponse = {
      message: "Unauthorized",
    };
    mockFetch(mockErrorResponse, 401, false);

    await expect(getUserData("invalidToken")).rejects.toThrow("Unauthorized");
  });


  it.each([
    () => login("username", "password"),
    () => getUserData("accessToken"),
  ])(
    "should get services with error",
    async (request) => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error());
      mockFetch({}, 404, false);

      try {
        await request();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
      }
    }
  );
});
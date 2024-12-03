import { AuthResponse, UserDataResponse } from "@/app/domain/Auth";

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });
  const data: AuthResponse = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getUserData = async (
  accessToken: string
): Promise<UserDataResponse | null> => {
  const response = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

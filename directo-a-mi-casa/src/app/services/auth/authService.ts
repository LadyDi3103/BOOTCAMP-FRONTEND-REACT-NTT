
export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  console.log("login data", data);
};

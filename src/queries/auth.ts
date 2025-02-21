export const authenticateUser = async (token: string) => {
  const res = await  fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/auth/google-sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token}),
  });

  return res.json()
}
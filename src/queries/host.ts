export const fetchHostData = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/host/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch host data');
  }

  return res.json();
}; 
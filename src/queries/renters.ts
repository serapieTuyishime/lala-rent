import { useQuery } from "@tanstack/react-query"

export const useAllRenters = () => {
  return useQuery<number, Error>({
    queryKey: ['all-renters'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/users/renters`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await res.json()
    },
    throwOnError: true,
  })
}
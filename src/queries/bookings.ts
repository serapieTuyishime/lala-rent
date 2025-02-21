import { useQuery } from "@tanstack/react-query";
import { Booking } from "../../types";

export const useBookings = (propertyId: string) => {
	return useQuery<Booking[], Error>({
		queryKey: ['all-properties'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/${propertyId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const stu= await res.json()
      console.log( stu)

      return stu
		},
    throwOnError: true
	})
}

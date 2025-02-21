import { useQuery } from "@tanstack/react-query";
import { Booking, BookingsPayload } from "../../types";

export const useBookings = (propertyId: string) => {
	return useQuery<Booking[], Error>({
		queryKey: ['bookings-per-property'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/${propertyId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return await res.json()
		},
		throwOnError: true
	})
}

export const useAllBookings = () => {
	return useQuery<number, Error>({
		queryKey: ['all-bookings'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return await res.json()
		},
		throwOnError: true
	})
}


export const createBooking = async (data: BookingsPayload) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		throw new Error('Failed to submit reservation')
	}

	return res.json()
}

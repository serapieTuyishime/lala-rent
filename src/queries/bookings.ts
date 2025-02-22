import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Booking, BookingsPayload } from "../../types";
import { useUser } from "@auth0/nextjs-auth0/client";

export const useBookings = (propertyId: string) => {
	return useQuery<Booking[], Error>({
		queryKey: ['bookings-per-property', propertyId],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/per-property/${propertyId}`, {
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

export const useAllBookingsPerUser = () => {
	const { user } = useUser()
	return useQuery<Booking[], Error>({
		queryKey: ['user-booking'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/per-user/${user?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			return await res.json()
		},
		enabled: !!user?.id
	})
}

export const useAllBookingsPerHost = () => {
	const { user } = useUser()
	return useQuery<Booking[], Error>({
		queryKey: ['owner-booking'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/per-host/${user?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			return await res.json()
		},
		enabled: !!user?.id
	})
}

export const useRemoveBooking = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete-my-booking'],
		mutationFn: async ({ id }: { id: string }) => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!res.ok) {
				throw new Error('Failed to delete booking')
			}
			return await res.json()
		},
		// Optimistic update
		onMutate: async ({ id }) => {
			await queryClient.cancelQueries({ queryKey: ['user-booking'] })
			const previousBookings = queryClient.getQueryData<Booking[]>(['user-booking'])
			queryClient.setQueryData(['user-booking'], (old: Booking[]) =>
				old?.filter((booking) => booking.id !== id)
			)
			return { previousBookings }
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(['user-booking'], context?.previousBookings)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['user-booking']})
		}
	})
}

export const useUpdateBooking = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['update-user-booking'],
		mutationFn: async ({ id, status }: { id: string; status: Booking['status'] }) => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status })
			})
			if (!res.ok) {
				throw new Error('Failed to update booking')
			}
			return await res.json()
		},
		onMutate: async ({ id, status }) => {
			await queryClient.cancelQueries({queryKey: ['owner-booking']})
			const previousBookings = queryClient.getQueryData<Booking[]>(['owner-booking'])
			queryClient.setQueryData(['owner-booking'], (old: Booking[]) =>
				old?.map((booking) =>
					booking.id === id ? { ...booking, status } : booking
				)
			)
			return { previousBookings }
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(['owner-booking'], context?.previousBookings)
		},
		onSuccess: () => {
			queryClient.refetchQueries({queryKey: ['owner-booking']})
		}
	})
}


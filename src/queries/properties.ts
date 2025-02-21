import { useQuery } from "@tanstack/react-query";
import { Property } from "../../types";

export const registerProperty = async (property: Property) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/properties`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ property }),
	});

	return res.json()
}

export const useProperties = () => {
	return useQuery<Property[], Error>({
		queryKey: ['all-properties'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/properties`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return res.json()
		}
	})
}

export const useProperty = (id: string) =>{
	return useQuery<Property , Error>({
		queryKey: ['single-property'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/properties/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return res.json()
		}
	})
}
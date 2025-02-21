"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProperty } from "@/queries/properties"
import { GetServerSideProps } from "next"
import { useBookings } from "@/queries/bookings"
import ReservationForm from "@/components/Reservation-form"

interface PageProps {
	propertyId: string;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const { propertyId } = context.params as { propertyId: string };

	return {
		props: { propertyId },
	};
};

export default function PropertyDetails({ propertyId }: { propertyId: string }) {


	const { data: property, isLoading } = useProperty(propertyId)
	const { data: bookings, isLoading: isBookingsLoading } = useBookings(propertyId)

	if (isLoading || isBookingsLoading) {
		return <div className="animate-pulse">Loading...</div>
	}

	if (!property) return null

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8 space-y-4">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">{property.title}</h1>
						<p className="text-sm text-slate-500">
							{property.description}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-right">
							<span className="text-sm text-slate-500">Rwf</span>
							<span className="ml-1 text-2xl font-bold text-slate-900">{property.price}</span>
							<span className="text-sm text-slate-500">/night</span>
						</div>
						<div className="flex gap-2">
							{property.facilities?.map((facility, index) => (
								<Badge key={index} variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
									{facility}
								</Badge>
							))}
						</div>
					</div>
				</div>

				{/* Image Gallery */}
				<div className="grid gap-4 lg:grid-cols-4 max-h-[50vh] overflow-hidden">
					<div className="lg:col-span-3">
						<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
							<Image
								src={"/placeholder.jpg"}
								alt="Main property image"
								fill
								className="object-cover"
							/>
						</div>
					</div>
					<div className="flex gap-4 lg:flex-col">
						{[1, 2, 3].slice(1).map((image, index) => (
							<div
								key={index}
								className="relative aspect-[4/3] flex-1 cursor-pointer overflow-hidden rounded-lg"
							>
								<Image
									src={"/placeholder.jpg"}
									alt={`Property image ${index + 2}`}
									fill
									className="object-cover transition-opacity hover:opacity-75"
								/>
							</div>
						))}
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
					<div className="space-y-8">
						{/* Property Stats */}
						<div className="flex flex-wrap gap-8 rounded-lg border bg-slate-50 p-4">
							<div>
								<p className="text-sm text-slate-500">Rented</p>
								<p className="font-semibold text-slate-900"> {bookings?.length} times</p>
							</div>
							<div>
								<p className="text-sm text-slate-500">Established in</p>
								<p className="font-semibold text-slate-900">12.12.2024</p>
							</div>
							<div>
								<p className="text-sm text-slate-500">Owner</p>
								<p className="font-semibold text-slate-900">Owner name</p>
							</div>
						</div>

						{/* Tabs */}
						<Tabs defaultValue="basic" className="space-y-4">
							<TabsList>
								<TabsTrigger value="basic">Basic info</TabsTrigger>
								<TabsTrigger value="info">Info</TabsTrigger>
								<TabsTrigger value="infotab">Info tab</TabsTrigger>
							</TabsList>
							<TabsContent value="basic" className="space-y-4">
								<h2 className="text-xl font-semibold">Basic info</h2>
								<p className="text-slate-600">{property.description}</p>
							</TabsContent>
							<TabsContent value="info" className="space-y-4">
								<h2 className="text-xl font-semibold">Info of the second tab</h2>
								<p className="text-slate-600">{property.description}</p>
							</TabsContent>
							<TabsContent value="infotab" className="space-y-4">
								<h2 className="text-xl font-semibold">Additional Information</h2>
								<p className="text-slate-600">{property.description}</p>
							</TabsContent>
						</Tabs>
					</div>

					{/* Reservation Form */}
					<ReservationForm  propertyId={propertyId}/>
				</div>
			</div>
		</div>
	)
}
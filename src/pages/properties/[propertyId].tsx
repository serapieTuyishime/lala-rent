"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock fetch function - replace with actual API call
const fetchPropertyDetails = async () => {
	// Simulate API call
	return {
		name: "Name of the house",
		price: 30000,
		amenities: ["Paid utilities", "Security"],
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		images: [
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VGUEp0u5qIiOn0riDepfmFVn1Qpuv6.png",
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VGUEp0u5qIiOn0riDepfmFVn1Qpuv6.png",
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VGUEp0u5qIiOn0riDepfmFVn1Qpuv6.png",
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VGUEp0u5qIiOn0riDepfmFVn1Qpuv6.png",
		],
		rentedTimes: 245,
		established: 2025,
		owner: "Kabutura",
	}
}

export default function PropertyDetails() {
	const [selectedImage, setSelectedImage] = useState(0)
	const [dateIn, setDateIn] = useState<Date>()
	const [dateOut, setDateOut] = useState<Date>()

	const { data: property, isLoading } = useQuery({
		queryKey: ["property"],
		queryFn: fetchPropertyDetails,
	})

	if (isLoading) {
		return <div className="animate-pulse">Loading...</div>
	}

	if (!property) return null

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8 space-y-4">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">{property.name}</h1>
						<p className="text-sm text-slate-500">
							Exact location of the house away from the specified flag that the user has set the flag should change.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-right">
							<span className="text-sm text-slate-500">Rwf</span>
							<span className="ml-1 text-2xl font-bold text-slate-900">{property.price.toLocaleString()}</span>
							<span className="text-sm text-slate-500">/night</span>
						</div>
						<div className="flex gap-2">
							{property.amenities.map((amenity) => (
								<Badge key={amenity} variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
									{amenity}
								</Badge>
							))}
						</div>
					</div>
				</div>

				{/* Image Gallery */}
				<div className="grid gap-4 lg:grid-cols-4">
					<div className="lg:col-span-3">
						<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
							<Image
								src={property.images[selectedImage] || "/placeholder.svg"}
								alt="Main property image"
								fill
								className="object-cover"
							/>
						</div>
					</div>
					<div className="flex gap-4 lg:flex-col">
						{property.images.slice(1).map((image, index) => (
							<div
								key={index}
								className="relative aspect-[4/3] flex-1 cursor-pointer overflow-hidden rounded-lg"
								onClick={() => setSelectedImage(index + 1)}
							>
								<Image
									src={image || "/placeholder.svg"}
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
								<p className="font-semibold text-slate-900">{property.rentedTimes} times</p>
							</div>
							<div>
								<p className="text-sm text-slate-500">Established in</p>
								<p className="font-semibold text-slate-900">{property.established}</p>
							</div>
							<div>
								<p className="text-sm text-slate-500">Owner</p>
								<p className="font-semibold text-slate-900">{property.owner}</p>
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
					<Card>
						<CardContent className="p-6">
							<h2 className="mb-6 text-xl font-semibold">Reserve a spot</h2>
							<form className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-900">Your name</label>
									<Input placeholder="Your name" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-900">Date in</label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn("w-full justify-start text-left font-normal", !dateIn && "text-muted-foreground")}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{dateIn ? format(dateIn, "PPP") : "Pick a date"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar mode="single" selected={dateIn} onSelect={setDateIn} initialFocus />
										</PopoverContent>
									</Popover>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-900">Date out</label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!dateOut && "text-muted-foreground",
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{dateOut ? format(dateOut, "PPP") : "Pick a date"}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar mode="single" selected={dateOut} onSelect={setDateOut} initialFocus />
										</PopoverContent>
									</Popover>
								</div>
								<Button className="w-full bg-orange-600 hover:bg-orange-700">Reserve a spot</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}


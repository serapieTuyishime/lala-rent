import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Home, Upload } from "lucide-react"
import Link from "next/link"
import { facilities } from "@/data/facilities"
import { locationCodes } from "@/data/Location-codes"

export default function PropertyForm() {

	return (
		<div className="min-h-screen mx-auto container">
			{/* Top Navigation */}
			<header className="border-b bg-white">
				<div className="container flex items-center justify-between py-4">
					<div className="flex items-center gap-2">
						<Link href="/" className="text-primary">
							<ChevronLeft className="h-5 w-5" />
						</Link>
						<div className="flex items-center gap-2">
							<Home className="h-5 w-5 text-primary" />
							<span className="text-muted-foreground">/</span>
							<span>My Property</span>
							<span className="text-muted-foreground">/</span>
							<span>New Property</span>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="outline">Cancel</Button>
						<Button>Next</Button>
					</div>
				</div>
			</header>

			<div className="container py-8">
				<h1 className="mb-8 text-2xl font-semibold">Configure Your Property</h1>

				<div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
					<Card>
						<CardContent className="p-6">
							<div className="space-y-8">
								{/* General Section */}
								<div>
									<h2 className="mb-4 text-xl font-semibold">General</h2>
									<div className="grid gap-6">
										<div className="grid gap-2">
											<Label htmlFor="title">Title</Label>
											<Input id="title" placeholder="Grand Sasono Hotel and Resorts" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="description">Description</Label>
											<Textarea id="description" placeholder="Add description" />
										</div>
									</div>
								</div>

								{/* Location Section */}
								<div>
									<h2 className="mb-4 text-xl font-semibold">Location</h2>
									<div className="grid gap-6">
										<div className="grid gap-4 sm:grid-cols-2">
											<div className="grid gap-2">
												<Label htmlFor="country">Select location</Label>
												<Select>
													<SelectTrigger id="country">
														<SelectValue placeholder="Select country" />
													</SelectTrigger>
													<SelectContent>
														{locationCodes.map(location => {
															return <SelectItem key={location.name} value={location.code}>{location.name}</SelectItem>
														})}
													</SelectContent>
												</Select>
											</div>
											<div className="grid gap-2">
												<Label htmlFor="price">Price per night</Label>
												<Input id="price" placeholder="Price per night" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-8">
						{/* Property Photos */}
						<Card>
							<CardContent className="p-6">
								<h2 className="mb-4 text-xl font-semibold">Property Photos</h2>
								<div className="rounded-lg border-2 border-dashed p-8">
									<div className="flex flex-col items-center justify-center gap-4 text-center">
										<Upload className="h-8 w-8 text-muted-foreground" />
										<div>
											<Button variant="link" className="text-primary">
												Upload
											</Button>
											<span className="text-muted-foreground"> or drag and drop files here</span>
										</div>
										<p className="text-sm text-muted-foreground">Max. file size: 10MB (Jpeg, Png)</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Main Facilities */}
						<Card>
							<CardContent className="p-6">
								<h2 className="mb-4 text-xl font-semibold">Main Facilities</h2>
								<div className="grid grid-cols-2 gap-4">
									{facilities.map((facility) => (
										<div key={facility} className="flex items-center space-x-2">
											<Checkbox id={facility.toLowerCase().replace(/\s+/g, "-")} />
											<Label htmlFor={facility.toLowerCase().replace(/\s+/g, "-")}>{facility}</Label>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}


'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import { facilities } from "@/data/facilities"
import { locationCodes } from "@/data/Location-codes"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { registerProperty } from "@/queries/properties"
import { useUser } from "@auth0/nextjs-auth0/client"

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	location: z.string().min(1, "Location is required"),
	price: z.number().min(1, "Price must be greater than 0"),
	facilities: z.array(z.string()).min(1, "Select at least one facility"),
	files: z.array(z.any()).optional()
})

export default function PropertyForm() {
	const [files, setFiles] = useState([])
	const {user} = useUser()

	const { control, register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			facilities: [],
			files: []
		}
	})

	const onSubmit = async (data) => {
		try {
			// Create FormData to handle file uploads
			const formData = new FormData()

			// Append regular form fields
			Object.keys(data).forEach(key => {
				if (key !== 'files') {
					formData.append(key,
						Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]
					)
				}
			})

			// Append files
			files.forEach((file) => {
				formData.append(`files`, file)
			})

			console.log('Form data being submitted:', data)

			await registerProperty({...data, hostId: user?.id})
		} catch (error) {
			console.error('Error submitting form:', error)
		}
	}

	const handleFileChange = (event) => {
		const selectedFiles = Array.from(event.target.files)
		if (selectedFiles.length > 3) {
			alert("You can upload up to 3 files")
			return
		}
		setFiles(selectedFiles)
		setValue("files", selectedFiles)
	}

	const watchedFacilities = watch('facilities')

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="min-h-screen mx-auto container">
				<div className="container py-8">
					<h1 className="mb-8 text-2xl font-semibold">Create new Property</h1>

					<div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
						<Card>
							<CardContent className="p-6">
								<div className="space-y-8">
									<div>
										<h2 className="mb-4 text-xl font-semibold">General</h2>
										<div className="grid gap-6">
											<div className="grid gap-2">
												<Label htmlFor="title">Title</Label>
												<Input
													id="title"
													placeholder="Grand Sasono Hotel and Resorts"
													{...register("title")}
												/>
												{errors.title && (
													<span className="text-red-500 text-sm">{errors.title.message}</span>
												)}
											</div>
											<div className="grid gap-2">
												<Label htmlFor="description">Description</Label>
												<Textarea
													id="description"
													placeholder="Add description"
													{...register("description")}
												/>
												{errors.description && (
													<span className="text-red-500 text-sm">{errors.description.message}</span>
												)}
											</div>
										</div>
									</div>

									<div>
										<h2 className="mb-4 text-xl font-semibold">Location</h2>
										<div className="grid gap-6">
											<div className="grid gap-4 sm:grid-cols-2">
												<div className="grid gap-2">
													<Label htmlFor="location">Select location</Label>
													<Select
														onValueChange={(value) => setValue("location", value)}
													>
														<SelectTrigger id="location">
															<SelectValue placeholder="Select location" />
														</SelectTrigger>
														<SelectContent>
															{locationCodes.map(location => (
																<SelectItem key={location.code} value={location.code}>
																	{location.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													{errors.location && (
														<span className="text-red-500 text-sm">{errors.location.message}</span>
													)}
												</div>
												<div className="grid gap-2">
													<Label htmlFor="price">Price per night</Label>
													<Input
														id="price"
														placeholder="Price per night"
														type="number"
														{...register("price", { valueAsNumber: true })}
													/>
													{errors.price && (
														<span className="text-red-500 text-sm">{errors.price.message}</span>
													)}
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
												<Input
													type="file"
													multiple
													accept="image/*"
													onChange={handleFileChange}
													className="hidden"
													id="file-upload"
												/>
												<Label htmlFor="file-upload">
													<Button variant="link" className="text-primary" type="button">
														Upload
													</Button>
												</Label>
												<span className="text-muted-foreground"> or drag and drop files here</span>
											</div>
											<p className="text-sm text-muted-foreground">Max. file size: 10MB (Jpeg, Png)</p>
											{files.length > 0 && (
												<div className="mt-4">
													<p>Selected files: {files.map(f => f.name).join(', ')}</p>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h2 className="mb-4 text-xl font-semibold">Main Facilities</h2>
									<div className="grid grid-cols-2 gap-4">
										{facilities.map((facility) => (
											<Controller
												key={facility}
												control={control}
												name="facilities"
												render={({ field }) => (
													<div className="flex items-center space-x-2">
														<Checkbox
															id={facility}
															checked={field.value?.includes(facility)}
															onCheckedChange={(checked) => {
																const updatedFacilities = checked
																	? [...(field.value || []), facility]
																	: field.value?.filter((value) => value !== facility) || []
																field.onChange(updatedFacilities)
															}}
														/>
														<Label htmlFor={facility}>{facility}</Label>
													</div>
												)}
											/>
										))}
									</div>
									{errors.facilities && (
										<span className="text-red-500 text-sm mt-2 block">{errors.facilities.message}</span>
									)}
									{/* Debug info */}
									<div className="mt-4 text-sm text-gray-500">
										Selected facilities: {watchedFacilities?.join(', ')}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
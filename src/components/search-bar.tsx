"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { locationCodes } from "@/data/Location-codes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import PropertiesList from "./lists/Properties"
import { z } from "zod"
import { isBefore } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReservedProperty } from "../../types"
import { useQuery } from "@tanstack/react-query"
import { Input } from "./ui/input"

const searchFormObject = z.object({
  checkInDate: z.string({
    required_error: "Check-in date is required",
  }),
  checkOutDate: z.string({
    required_error: "Check-out date is required",
  }),
  locationCode: z.string({
    required_error: "Please select a location"
  })
}).refine(
  (data) => isBefore(new Date(data.checkInDate), new Date(data.checkOutDate)),
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  }
)

export type SearchFormProps = z.infer<typeof searchFormObject>

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<SearchFormProps | null>(null)

  useQuery<ReservedProperty, Error>({
    queryKey: ['available-properties', formData?.checkInDate, formData?.checkOutDate, formData?.locationCode],
    queryFn: async () => {
      const dateIn = formData?.checkInDate;
      const dateOut = formData?.checkOutDate;
      const locationCode = formData?.locationCode
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_BASE_URL}/bookings/search-available?dateIn=${dateIn}&dateOut=${dateOut}&locationCode=${locationCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await res.json();
    },
    enabled: !!formData
  });

  const handleSearch = (data: SearchFormProps) => {
    setIsOpen(true)
    setFormData(data)
  }

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<SearchFormProps>({
    resolver: zodResolver(searchFormObject)
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="bg-white p-4 rounded-lg shadow-md grid grid-cols-4 items-center justify-center gap-4 mb-8 text-primary"
      >
        <div>
          <Select
            onValueChange={(value) => setValue('locationCode', value)}
          >
            <SelectTrigger id="locationCode">
              <SelectValue placeholder="Select where you want to go" />
            </SelectTrigger>
            <SelectContent>
              {locationCodes.map((location) => (
                <SelectItem key={location.name} value={location.code}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.locationCode && (
            <p className="text-red-500 text-sm absolute">{errors.locationCode.message}</p>
          )}
        </div>
        <div>
          <Input type="date" {...register('checkInDate')} />
          {errors.checkInDate && (
            <p className="text-red-500 text-sm absolute">{errors.checkInDate.message}</p>
          )}
        </div>
        <div>
          <Input type="date" {...register('checkOutDate')} />

          {errors.checkOutDate && (
            <p className="text-red-500 text-sm absolute">{errors.checkOutDate.message}</p>
          )}
        </div>
        <Button type="submit" className="bg-primary text-white hover:bg-orange-600">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-full bg-secondary">
          <SheetHeader>
            <SheetTitle>Available properties</SheetTitle>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="absolute right-4 top-3 bg-primary text-white border border-primary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetHeader>
          <div className="mt-6">
            <PropertiesList queryData={formData} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}


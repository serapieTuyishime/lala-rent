"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Search, X } from "lucide-react"
import { locationCodes } from "@/data/Location-codes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import PropertiesList from "./lists/Properties"
import { z } from "zod"
import { format, isBefore, startOfDay } from "date-fns"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { ReservedProperty } from "../../types"
import { useQuery } from "@tanstack/react-query"

const searchFormObject = z.object({
  checkInDate: z.date({
    required_error: "Check-in date is required",
  }),
  checkOutDate: z.date({
    required_error: "Check-out date is required",
  }),
  locationCode: z.string({
    required_error: "Please select a location"
  })
}).refine(
  (data) => isBefore(data.checkInDate, data.checkOutDate),
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
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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
          <Controller
            control={control}
            name="checkInDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      errors.checkInDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.checkInDate && (
            <p className="text-red-500 text-sm absolute">{errors.checkInDate.message}</p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="checkOutDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      errors.checkOutDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
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


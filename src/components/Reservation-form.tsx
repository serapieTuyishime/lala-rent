// import { useState } from "react"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { isBefore, startOfDay } from "date-fns"
import {  Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBooking } from "@/queries/bookings"
import { useUser } from "@auth0/nextjs-auth0/client"
import { User } from "../../types"
import { Input } from "./ui/input"

const reservationSchema = z.object({
  checkInDate: z.string({
    required_error: "Check-in date is required",
  }).refine(
    (date) => isBefore(startOfDay(new Date()), startOfDay(date)),
    "Check-in date must be in the future"
  ),
  checkOutDate: z.string({
    required_error: "Check-out date is required",
  })
}).refine(
  (data) => isBefore(new Date(data.checkInDate), new Date(data.checkOutDate)),
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  }
)

export type BookingsFormData = z.infer<typeof reservationSchema>


const ReservationForm = ({ propertyId }: { propertyId: string }) => {
  // const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { user } = useUser()
  const authUser = user as User

  const {
    // control,
    handleSubmit,
    formState: { errors },
    // watch,
    register
  } = useForm<BookingsFormData>({
    resolver: zodResolver(reservationSchema),
  })

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => { },
  })

  const onSubmit = (data: BookingsFormData) => {
    mutation.mutate({
      ...data,
      userId: authUser.id,
      propertyId: propertyId
    })
  }

  // const checkInDate = watch("checkInDate")
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-xl font-semibold">Reserve a spot</h2>

        {mutation.isError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              Failed to submit reservation. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Date in</label>
            <Input type="date" {...register('checkInDate')}/>
            {errors.checkInDate && (
              <p className="text-red-500 text-sm">{errors.checkInDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Date out</label>
            <Input type="date" {...register('checkOutDate')}/>
            {errors.checkOutDate && (
              <p className="text-red-500 text-sm">{errors.checkOutDate.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Reserve a spot"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReservationForm
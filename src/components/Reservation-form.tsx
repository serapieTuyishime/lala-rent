// import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, isBefore, startOfDay } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBooking } from "@/queries/bookings"
import { useUser } from "@auth0/nextjs-auth0/client"
import { User } from "../../types"

const reservationSchema = z.object({
  checkInDate: z.date({
    required_error: "Check-in date is required",
  }).refine(
    (date) => isBefore(startOfDay(new Date()), startOfDay(date)),
    "Check-in date must be in the future"
  ),
  checkOutDate: z.date({
    required_error: "Check-out date is required",
  })
}).refine(
  (data) => isBefore(data.checkInDate, data.checkOutDate),
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
    control,
    handleSubmit,
    formState: { errors },
    watch,
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

  const checkInDate = watch("checkInDate")
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
            <Controller
              control={control}
              name="checkInDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
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
                        // setIsCalendarOpen(false)
                      }}
                      disabled={(date) => isBefore(date, startOfDay(new Date()))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.checkInDate && (
              <p className="text-red-500 text-sm">{errors.checkInDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Date out</label>
            <Controller
              control={control}
              name="checkOutDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
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
                        // setIsCalendarOpen(false)
                      }}
                      disabled={(date) => checkInDate ? isBefore(date, checkInDate) : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
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
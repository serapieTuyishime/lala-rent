

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const ReservationForm = () => {
  const [dateIn, setDateIn] = useState<Date>()
  const [dateOut, setDateOut] = useState<Date>()
  return (
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
  )
}

export default ReservationForm
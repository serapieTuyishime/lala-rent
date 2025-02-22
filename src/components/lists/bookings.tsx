import { useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Booking } from "../../../types"
import { calculateDaysBetween, generateLocationName } from "@/lib"
import Link from "next/link"
import { useRemoveBooking, useUpdateBooking } from "@/queries/bookings"


export default function BookingsTable({ role, data = [] }: { role: string, data?: Booking[] }) {
  const [filter, setFilter] = useState("")
  const updateBooking = useUpdateBooking()
  const deleteBooking = useRemoveBooking()

  const filteredData: Booking[] | undefined = useMemo(() => {
    if (!data) return []
    if (!filter) return data
    data?.filter(
      (item) => {
        const locationName = generateLocationName(item?.property?.location);
        const ownerName = item?.property?.owner?.firstName
        if (!item || !locationName || !ownerName) return
        return locationName.toLowerCase().includes(filter.toLowerCase()) ||
          ownerName.toLowerCase().includes(filter.toLowerCase())
      },
    )
  }, [data, filter])

  return (
    <div className="space-y-4 w-full">
      <Input
        placeholder="Filter by location or owner..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((item) => (
              <TableRow key={item.id}>
                <Link className="line-clamp-2" href={`/properties/${item.property?.id}`}><TableCell>{item?.id.substring(0,16)}...</TableCell></Link>
                <TableCell>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={"/placeholder.jpg"} alt="Property" fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell>{generateLocationName(item?.property?.location)}</TableCell>
                <TableCell>{generateLocationName(item?.property?.title)}</TableCell>
                <TableCell>{calculateDaysBetween(item.checkInDate, item.checkOutDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {item.property?.facilities.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-primary text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {role === 'host' ?
                      (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => updateBooking.mutate({ id: item.id, status: "rejected" })}>
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                          {
                            item.status !== 'approved' && <Button variant="ghost" size="icon" onClick={() => updateBooking.mutate({ id: item.id, status: "approved" })}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                          }
                        </>
                      ) :
                      (<Button variant="ghost" size="icon" onClick={() => deleteBooking.mutate({ id: item.id })}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      )
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Booking["status"] }) {
  const styles = {
    rejected: "bg-red-100 text-red-500 border-red-200",
    approved: "bg-green-100 text-green-500 border-green-200",
    pending: "bg-orange-100 text-primary border-orange-200",
  }

  return <span className={`px-3 py-1 rounded-full text-sm border ${styles[status]}`}>{status}</span>
}


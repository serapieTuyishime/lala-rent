import Image from "next/image"
import { ReservedProperty } from "../../../types"
import { Badge } from "../ui/badge"
import { useBookings } from "@/queries/bookings"
import { generateLocationName } from "@/lib"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { Card } from "../ui/card"

export const LargePropertyCard = ({ property }: { property: ReservedProperty }) => {
  const { data: bookings } = useBookings(property?.id || "")
  return (
    <Card className="rounded-xl overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row max-w-3xl">
        <div className="md:w-2/5 relative">
          <Image src={"/placeholder.jpg"} alt={property.title} fill className="object-cover" />
        </div>

        <div className="flex-1 p-3">
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p className="text-muted-foreground mt-1">{generateLocationName(property.location)}</p>
            </div>
            <div>
              <p className="text-xs font-medium">Rented out {bookings?.length} nights</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {property?.facilities.slice(0,2).map((facility, index) => (<Badge key={index} variant="secondary" className="bg-orange-50 text-primary hover:bg-orange-100">
                {facility}
              </Badge>))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm">Rwf</span>
                <span className="text-xl font-bold">{property.price}</span>
                <span className="text-sm text-muted-foreground">/night</span>
              </div>
              <Link href={`/properties/${property.id}`} className={`${buttonVariants({ variant: "default" })} text-white hover:text-primary`}>Commit</Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
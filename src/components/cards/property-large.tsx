import Image from "next/image"
import { ReservedProperty } from "../../../types"
import { Badge } from "../ui/badge"
import { useBookings } from "@/queries/bookings"
import { generateLocationCode } from "@/lib"
import { buttonVariants } from "../ui/button"
import Link from "next/link"

export const LargePropertyCard = ({ property }: { property: ReservedProperty }) => {
  const { data: bookings } = useBookings(property.id)
  return (
    <div className="rounded-xl border border-orange-500/20 overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row max-w-3xl">
        <div className="md:w-2/5 lg:w-1/5 h-[300px] relative">
          <Image src={"/placeholder.jpg"} alt={property.title} fill className="object-cover" />
        </div>

        <div className="flex-1 p-3">
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p className="text-muted-foreground mt-1">{generateLocationCode(property.location)}</p>
            </div>
            <div>
              <p className="text-lg font-medium">Rented out {bookings?.length} nights so far</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="border-primary text-primary">
                Electricity
              </Badge>
              <Badge variant="secondary" className="border-primary text-primary">
                wifi
              </Badge>
              <Badge variant="secondary" className="border-primary text-primary">
                Security
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-sm">Rwf</span>
                <span className="text-2xl font-bold">{property.price}</span>
                <span className="text-sm text-muted-foreground">/night</span>
              </div>
              <Link href={`/properties/${property.id}`} className={`${buttonVariants({ variant: "default"})} text-white hover:text-primary`}>Commit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Property } from "../../../types"
import Link from "next/link"

interface PropertyCardProps {
    property: Property,
    className?: string
}

export default function PropertyCard({
    property,
    className,
}: PropertyCardProps) {
    const {
        title,
        description,
        price, facilities } = property
    return (
        <Card className={`overflow-hidden transition-all hover:shadow-lg ${className}`}>
            <Link href={`/properties/${property.id}`}>
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={"/placeholder.jpg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardContent className="space-y-3 p-4">
                <div className="space-y-1.5">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {facilities.map((facility, index) => (<Badge key={index} variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
                        {facility}
                    </Badge>))}
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-600">Rwf</span>
                    <span className="text-xl font-semibold text-gray-800">{price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">/night</span>
                </div>
            </CardContent>
            </Link>
        </Card>
    )
}


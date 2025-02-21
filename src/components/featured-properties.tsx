import { useProperties } from "@/queries/properties"
import PropertyCard from "./cards/property"

export default function FeaturedProperties() {
  const {data: allProperties}= useProperties()
  return (
    <section id="featured-properties" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProperties?.map((property) => (
            <PropertyCard key={property.id} property ={property}/>
          ))}
        </div>
      </div>
    </section>
  )
}


import { motion } from "framer-motion"
import Image from "next/image"

const properties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: "$500/night",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: "$250/night",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Modern City Apartment",
    location: "New York City, New York",
    price: "$300/night",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function FeaturedProperties() {
  return (
    <section id="featured-properties" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-primary font-bold">{property.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


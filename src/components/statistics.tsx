import { useAllBookings } from "@/queries/bookings"
import { useProperties } from "@/queries/properties"
import { useAllRenters } from "@/queries/renters"
import { motion } from "framer-motion"


export default function Statistics() {
  const { data: allProperties } = useProperties()
  const { data: allBookingsCount } = useAllBookings()
  const { data: allRentersCount } = useAllRenters()
  const stats = [
    { value: allProperties?.length, label: "Properties" },
    { value: allRentersCount, label: "Happy Renters" },
    { value: allBookingsCount, label: "Successful Bookings" },
  ]

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


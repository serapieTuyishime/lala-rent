import { motion } from "framer-motion"
import { DollarSign, Shield, Clock } from "lucide-react"

const benefits = [
  {
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    title: "Affordable Prices",
    description: "Find the best deals on short-term and long-term rentals.",
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "Verified Hosts",
    description: "All our hosts are thoroughly vetted for your peace of mind.",
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: "Flexible Bookings",
    description: "Easy booking process with flexible cancellation options.",
  },
]

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


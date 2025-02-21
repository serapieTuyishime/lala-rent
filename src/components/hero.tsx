import { motion } from "framer-motion"
import SearchBar from "./search-bar"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-100 to-orange-200 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 uppercase"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Find Your Perfect Home</h1>
          <p className="text-xl text-gray-700 mb-8">Away</p>
          <SearchBar />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="#featured-properties"
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Explore Properties
          </a>
        </motion.div>
      </div>
    </section>
  )
}


import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [duration, setDuration] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Search:", { location, checkIn, checkOut, duration })
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4 mb-8"
    >
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="date"
        placeholder="Check-in"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="date"
        placeholder="Check-out"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Duration</option>
        <option value="short">Short-term</option>
        <option value="long">Long-term</option>
      </select>
      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-orange-600 transition-colors"
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    </form>
  )
}


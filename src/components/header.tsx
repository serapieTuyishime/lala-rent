import Link from "next/link"
import { Home } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">RentEase</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/other" className="text-gray-600 hover:text-primary transition-colors">
                Find a Rental
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                List Your Property
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


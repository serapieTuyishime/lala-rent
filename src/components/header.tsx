import Link from "next/link"
import { CircleUser, Home } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "../../types"


export default function Header() {
  const { user } = useUser()

  const dbUser=  user as User
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
            {
              dbUser ? (
                <li className="hover:mouse-pointer">

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <CircleUser size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Account settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="capitalize">{dbUser.firstName}</DropdownMenuItem>
                      <Link href="/">
                        <DropdownMenuItem>My {dbUser.role} dashboard</DropdownMenuItem>
                      </Link>
                      <Link href="/api/auth/logout" className="text-gray-600 hover:text-primary transition-colors">
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li className="">
                  <Link href="/api/auth/login" className="text-gray-600 hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}


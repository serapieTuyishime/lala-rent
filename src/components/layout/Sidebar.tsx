import { useUser } from "@auth0/nextjs-auth0/client"
import { User } from "../../../types"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

export const Sidebar = () =>{
  const {user: userThatIwillChange} = useUser()
const user = userThatIwillChange as User

  return (
    <div className="min-h-screen bg-orange-50/80 flex flex-col">
      <div className="p-4">
        <div className="rounded-lg border border-orange-500/20 p-3 flex items-center gap-3 bg-white/50">
          <Avatar className="rounded-full h-12 w-12 overflow-hidden">
            <AvatarImage src={user?.imageUrl} alt={user.firstName} />
            <AvatarFallback>LL</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        <div>
          <h2 className="text-sm font-semibold mb-4">GENERAL</h2>
          <div className="space-y-1">
            <NavLink href="/properties/create">New Property</NavLink>
            <NavLink href="/properties/bookings">Bookings</NavLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-4">OTHERS</h2>
          <div className="space-y-1">
            <NavLink href="/api/auth/logout">Sign out</NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 text-sm rounded-lg hover:bg-orange-100 transition-colors">
      {children}
    </Link>
  )
}

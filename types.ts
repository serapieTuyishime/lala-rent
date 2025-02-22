export type User ={
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  created_at: string | null,
  imageUrl?: string 
  role: string,
  isNew: boolean
}

export type Property = {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  hostId: string;
  facilities: string[],
  owner?: User,
};

export type Booking = {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  property?: Property; 
  userId?: string;  
  status: "rejected" | "approved" | "pending"
}

export interface BookingsPayload {
  checkInDate: string;
  checkOutDate: string;
  propertyId: string; 
  userId: string;
}

export interface ReservedProperty extends Property{
  bookings: Booking[]
}
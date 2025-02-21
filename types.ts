export type User ={
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  created_at: string | null,
  imageUrl: string | null
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
  facilities: string[]
};

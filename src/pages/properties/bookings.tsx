import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/layout/Sidebar';
import BookingsTable from '@/components/lists/bookings';
import { User } from '../../../types';
import { useAllBookingsPerHost, useAllBookingsPerUser } from '@/queries/bookings';

const BookingsPage = () => {
  const { user: authUser, isLoading } = useUser();
  const {data: bookings} = useAllBookingsPerUser()
  const {data: bookingsPerhost} = useAllBookingsPerHost()
  const router = useRouter();
 const user = authUser as User;
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex '>
      <Sidebar />
      <BookingsTable data={user?.role === 'renter'? bookings : bookingsPerhost} role={user?.role} />
    </div>
  );
};

export default BookingsPage

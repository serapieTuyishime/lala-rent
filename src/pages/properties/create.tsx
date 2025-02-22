import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropertyForm from '@/components/property-form';
import { Sidebar } from '@/components/layout/Sidebar';

const HostPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== 'host') {
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex '>
      <Sidebar />
      <PropertyForm />
    </div>
  );
};

export default HostPage; 
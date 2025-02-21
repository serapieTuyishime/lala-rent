import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropertyForm from '@/components/property-form';

const HostPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== 'host') {
      router.push('/'); // Redirect to homepage if not a host
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div >
      <PropertyForm />
    </div>
  );
};

export default HostPage; 
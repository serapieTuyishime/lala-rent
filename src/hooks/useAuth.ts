import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export function useAuth0Complete(onComplete: (userData: any) => void) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      const handleAuthComplete = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/auth/google-sign-in`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              token: user.sub,
              email: user.email 
            })
          });

          if (!response.ok) {
            throw new Error('Backend authentication failed');
          }

          const userData = await response.json();
          onComplete(userData);
          
        } catch (error) {
          console.error('Authentication error:', error);
          router.push('/api/auth/logout');
        }
      };

      handleAuthComplete();
    }
  }, [user, isLoading, router, onComplete]);

  return { user, error, isLoading };
}
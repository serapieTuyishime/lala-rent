import { authenticateUser } from '@/queries/auth';
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { User } from '../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Custom callback handling
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {

          if (session?.idToken) {

            const dbUser: User = await authenticateUser(session.idToken)
            const modifiedSession = {
              ...session,
              user: dbUser
            };
            console.log("----- modified session", JSON.stringify(modifiedSession, null, 2))

            return modifiedSession;
          }
          else return session
        }
      });
    } catch (error) {
      console.error('Auth callback error:', error);
      res.status(500).end('Auth callback error');
    }
  },
});
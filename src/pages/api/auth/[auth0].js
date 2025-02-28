import { authenticateUser } from '@/queries/auth';
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {

          if (session?.idToken) {

            const dbUser = await authenticateUser(session.idToken)
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
/**
 * Import the handleAuth function from @auth0/nextjs-auth0.
 */
import { Session, handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Define a GET route for the authentication endpoint.
 * This route uses the handleAuth function from @auth0/nextjs-auth0 to handle authentication.
 */
export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/main/home",
    }),
    //@ts-ignore
    callback: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            //@ts-ignore
           return await handleCallback(req, {
                afterCallback
            });
        } catch (error) {
            console.error(error);
        }
    }
});

//@ts-ignore
const afterCallback = async (req: NextApiRequest, session: Session) => {
    console.log('I am getting called after callback', session)
    if (session.user) {
        console.log('user found', session.user)
    } else {
        console.log('user not found', session)
    }
        
    return session;
};
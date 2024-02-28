/**
 * Import the handleAuth function from @auth0/nextjs-auth0.
 */
import { handleAuth } from '@auth0/nextjs-auth0';

/**
 * Define a GET route for the authentication endpoint.
 * This route uses the handleAuth function from @auth0/nextjs-auth0 to handle authentication.
 */
export const GET = handleAuth();
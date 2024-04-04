import axios from 'axios';

export default async function getManagementToken() {
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  const audience = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`;
  const grantType = 'client_credentials';
  
  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    audience: audience,
    grant_type: grantType
  };

  try {
    const response = await axios.post(url, data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

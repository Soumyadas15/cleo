import axios from 'axios';

export default async function getUser(id:string, accessToken:string) {
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}`;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

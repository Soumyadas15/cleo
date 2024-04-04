import axios from 'axios';

export const getUserRoles = async (userId: string, accessToken: string) => {
  try {
    const scopes = 'read:users read:roles read:role_members';

    const response = await axios.get(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get roles for user ${userId}: ${error.response?.data.message}`);
    } else {
        //@ts-ignore
      throw new Error(`Failed to get roles for user ${userId}: ${error.message}`);
    }
  }
};

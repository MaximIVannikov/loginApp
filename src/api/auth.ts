import axios from 'axios';

interface TokenResponse {
	accessToken: string;
}

export const getNewAccessToken = async (refreshToken: string): Promise<TokenResponse> => {
	const response = await axios.post('https://frontend-test-be.stage.thinkeasy.cz/auth/refresh-token', {
		token: refreshToken,
	});
	return response.data;
};

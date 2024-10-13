import axios from 'axios';

import { getNewAccessToken } from '../api/auth';

const axiosInstance = axios.create({
	baseURL: 'https://frontend-test-be.stage.thinkeasy.cz',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const token = localStorage.getItem('refreshToken');

		if (error.response.status === 401 && token) {
			try {
				const { accessToken } = await getNewAccessToken(token);
				error.config.headers['Authorization'] = `Bearer ${accessToken}`;
				return axiosInstance(error.config);
			} catch (refreshError) {
				console.error('Refresh token expired or invalid:', refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;

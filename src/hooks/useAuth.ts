import { useRecoilState } from 'recoil';
import { authState } from '../state/authState';
import { AuthState } from '../types/authTypes';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
	const [auth, setAuth] = useRecoilState<AuthState | null>(authState);
	const navigate = useNavigate();

	useEffect(() => {
		if (auth) {
			localStorage.setItem('auth', JSON.stringify(auth));
		} else {
			localStorage.removeItem('auth');
		}
	}, [auth]);

	useEffect(() => {
		const storedAuth = localStorage.getItem('auth');
		if (storedAuth) {
			setAuth(JSON.parse(storedAuth));
		}
	}, [setAuth]);

	const login = (data: AuthState) => {
		setAuth(data);
		navigate('/posts');
	};

	const signup = (data: AuthState) => {
		setAuth(data);
		navigate('/auth/login');
	};

	const logout = () => {
		setAuth(null);
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('user');

		navigate('/auth/login');
	};

	return { auth, setAuth, login, signup, logout };
};

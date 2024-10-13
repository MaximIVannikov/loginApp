import { atom } from 'recoil';
import { AuthState } from '../types/authTypes';

export const authState = atom<AuthState | null>({
	key: 'authState',
	default: null,
});

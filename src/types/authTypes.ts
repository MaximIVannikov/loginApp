export interface AuthState {
	accessToken: string;
	refreshToken: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface SignupInput {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
}

export interface RefreshTokenInput {
	token: string;
}

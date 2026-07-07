import React, { createContext, useState } from "react";

type Credentials = {
	email: string;
	password: string;
	mfa_token: string;
};

export type AuthState = {
	isAuthenticated: boolean;
	user: Record<string, unknown> | null;
	login: (credentials: Credentials) => boolean;
	logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const login = () => {
		return false;
	};
	const logout = () => {
		return false;
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user: credentials, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

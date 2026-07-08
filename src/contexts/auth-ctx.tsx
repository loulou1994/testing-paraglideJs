import React, { createContext, useContext, useState } from "react";

type UserAuth = {
	email: string;
	mfa_token: string;
};

export type AuthState = {
	isLoading: boolean;
	user: UserAuth | null;
	isAuthenticated: boolean;
	setUser: (userAuth: UserAuth) => void;
	setIsLoading: (loading: boolean) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	// login: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserAuth | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user,
				setIsLoading,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx)
		throw new Error(
			"The useAuth hook needs to be within an AuthProvider component",
		);
	return ctx;
}

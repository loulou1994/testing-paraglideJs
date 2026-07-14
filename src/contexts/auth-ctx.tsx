import { createStore } from "@tanstack/store";
import React, { createContext, useContext, useState } from "react";

// retrieved from server response along with the access token if it's returned as json response
type AuthAccessData = {
	email: string;
	mfa_token: string;
};

export type AuthData = {
	isLoading: boolean;
	user: AuthAccessData | null;
	isAuthenticated: boolean;
	// setUser: (userAuth: UserAuth) => void;
	// setIsLoading: (loading: boolean) => void;
	// setIsAuthenticated: (isAuthenticated: boolean) => void;
	// login: () => void;
};

const authData = createStore<AuthData>({
	isLoading: true,
	user: null,
	isAuthenticated: false,
})

const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<AuthAccessData | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user,
				// setIsLoading,
				// setUser,
				isAuthenticated,
				// setIsAuthenticated,
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

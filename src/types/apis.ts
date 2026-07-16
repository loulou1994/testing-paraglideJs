type ApiResponse = {
	success: boolean;
	message: string;
	translated_message: string;
};

export type ApiResponseSuccess<T> = ApiResponse & { success: true; data: T };
export type ApiResponseError = ApiResponse & {
    success: false;
	errors?: string;
	error_code: string;
};

export type LoginAuth = {
    access_token: string;
    refresh_token: string;
	// email: string;
	// password: string;
	// mfa_token: string;
};

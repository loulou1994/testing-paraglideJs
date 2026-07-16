import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { LoginPayload } from "#/routes/_auth/-validations/login";
import type { ApiResponseSuccess, LoginAuth } from "#/types/apis";
import { baseApi } from "./base-api";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (payload: LoginPayload) => {
			return baseApi<ApiResponseSuccess<LoginAuth>>({
				endpoint: "login/",
				type: "mutation",
				method: "POST",
				payload,
			});
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["globalState", "auth"], data.data);
			router.invalidate();
		},
	});
};

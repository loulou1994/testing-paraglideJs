type ApiType = "mutation" | "query";

type ApiRequest<T extends ApiType> = {
	type: T;
	endpoint: string;
};

type ApiQuery = ApiRequest<"query"> & {
	params: Record<string, string>;
	method: "GET";
};
type ApiMutation = ApiRequest<"mutation"> & {
	method: "POST" | "DELETE" | "PUT" | "PATCH";
	payload?: Record<string, unknown>;
};

const BASE_RESOURCE_API = "http:api.resource.com/";
const BASE_AUTH_API = "http://192.168.0.72:8001/api/v1/";

const getRequestInit = (reqData: ApiQuery | ApiMutation): RequestInit => {
	if (reqData.type === "mutation") {
		return {
			body: JSON.stringify(reqData.payload),
			method: reqData.method,
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include"
		};
	}

	return {
		credentials: "include",
		method: reqData.type,
	};
};

export async function baseApi<Output>(
	reqData: ApiQuery | ApiMutation,
): Promise<Output> {
	const headers = getRequestInit(reqData);
	let response: any;

	if (reqData.type === "query") {
		const queryParams = new URLSearchParams(reqData.params);
		response = await fetch(
			`${BASE_RESOURCE_API}${reqData.endpoint}?${queryParams.toString()}`,
			headers,
		);
	} else if (reqData.type === "mutation") {
		response = await fetch(`${BASE_AUTH_API}${reqData.endpoint}`, headers);
	}

	if (response.status < 200 || response.status > 299) {
		// handle potential error response
		return "error over here" as any;
	}

	if (response.status === 401 && reqData.type === "mutation") {
		// auth access token may be expired, try refreshing token
		return "requesting token refresh" as any;
	}

	const data = await response.json();

	return data;
}

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
const BASE_AUTH_API = "http:api.auth.com/";

const getRequestInit = (apiType: ApiType, headers?: RequestInit): RequestInit => {
    if (apiType === "mutation") {
        return {    
            body: JSON.stringify(headers?.body)
        }   
    }

    return {
        // body: headers?.body
    }
}

export async function baseApi<Output>(apiData: ApiQuery | ApiMutation): Promise<Output> {
    const headersData = getRequestInit(apiData.type)

    let response: any
    if (apiData.type === "query") {
        const queryParams = new URLSearchParams(apiData.params);
        response = await fetch(`${apiData.endpoint}?${queryParams.toString()}`, );

    } else if (apiData.type === "mutation") {
        response = await fetch(`${apiData.endpoint}`, {
            method: apiData.method,
            body: 
        })
    }

    return response
}

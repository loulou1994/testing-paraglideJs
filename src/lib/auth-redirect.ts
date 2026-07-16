import { redirect } from "@tanstack/react-router";
import { type MyRouterContext } from "#/routes/__root";

export function redirectToAuthRoute(routerCtx: MyRouterContext, redirectBackTo: string) {
	const authState = routerCtx.queryClient.getQueryData(["globalState", "auth"]);

	if (!authState) {
		throw redirect({
			to: "/",
			search: {
				redirect: redirectBackTo,
			},
		});
	}
}

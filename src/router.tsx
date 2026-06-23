import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getContext } from "./integrations/tanstack-query/root-provider";
// import server-only helper. Vinxi strips this entirely on the browser build.
import { getServerLocale } from "./locale.server";
import {
	deLocalizeUrl,
	getLocale as getClientLocale,
	localizeUrl,
} from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const context = getContext();
	// This isomorphic switch runs completely synchronously on both sides
	const getDeterministicLocale = createIsomorphicFn()
		.server(() => {
			return getServerLocale();
		})
		.client(() => {
			return getClientLocale();
		});

	const router = createTanStackRouter({
		routeTree,
		context: { ...context, locale: getDeterministicLocale() },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,

		rewrite: {
			input: ({ url }) => deLocalizeUrl(url),
			output: ({ url }) => localizeUrl(url),
		},
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}

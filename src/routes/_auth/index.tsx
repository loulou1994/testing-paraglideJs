import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/dashboard",
	}),
	beforeLoad: ({ context, search }) => {
		// Redirect if already authenticated
		if (context.auth?.isAuthenticated) {
			throw redirect({ to: search.redirect });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/"!</div>;
}

import { Outlet, useRouter } from "@tanstack/react-router";
import isEqual from "lodash/isEqual";
import { useEffect } from "react";
import { useAuth } from "#/contexts/auth-ctx";

export function AuthContextSyncWithRouter() {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isEqual(auth, router.options.context.auth)) {
			router.update({
				context: {
					...router.options.context,
					auth,
					
				},
			});
			router.invalidate();
		}
	}, [router, auth]);

	if (auth.isLoading) return <div>Loading...</div>;

	return <Outlet />;
}

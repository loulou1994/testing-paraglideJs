import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { getLocale } from "#/paraglide/runtime";
import { AuthAnimatedVideo } from "./-components/auth-animated-video";
import { AuthLoginForm } from "./-components/auth-login-form";

export const Route = createFileRoute("/_auth/")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/dashboard",
	}),
	// beforeLoad: ({ context, search }) => {
	// 	// Redirect if already authenticated
	// 	console.log(context.auth);
	// 	if (context.auth?.isAuthenticated) {
	// 		throw redirect({ to: search.redirect });
	// 	}
	// },
	component: RouteComponent,
});

function RouteComponent() {
	const [isMounted, setIsMounted] = useState(false);
	const currentLocale = getLocale();
	const matches = useMediaQuery("(min-width: 1024px)");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	
	return (
		<div
			className="flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row lg:justify-evenly"
			dir={matches ? "rtl" : currentLocale === "ar" ? "rtl" : "ltr"}
		>
			<AuthLoginForm />
			<AuthAnimatedVideo />
		</div>
	);
}

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";
import { getLocale } from "#/paraglide/runtime";
import { AuthAnimatedVideo } from "./-components/auth-animated-video";
import { AuthLoginForm } from "./-components/auth-login-form";
// import { ForgotPwd } from "./-components/forgot-pwd";

export const Route = createFileRoute("/_auth/")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/dashboard",
	}),
	beforeLoad: ({ context, search }) => {
		const authState = context.queryClient.getQueryData(["globalState", "auth"]);

		if (authState) {
			throw redirect({ to: search.redirect });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const currentLocale = getLocale();
	const matches = useMediaQuery("(min-width: 1024px)");

	return (
		<div
			className="flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row relative pt-6 lg:pt-12 lg:pr-[clamp(20px,3vw,48px)]"
			dir={matches ? "rtl" : currentLocale === "ar" ? "rtl" : "ltr"}
		>
			<AuthLoginForm />
			<AuthAnimatedVideo />
		</div>
	);
}

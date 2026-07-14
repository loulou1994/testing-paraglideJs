import type React from "react";
import { useMediaQuery } from "usehooks-ts";
import { getLocale } from "#/paraglide/runtime";
import { BrandHeader } from "../brand-header";
import ParaglideLocaleSwitcher from "../LocaleSwitcher";
import ThemeToggle from "../ThemeToggle";

export function AuthHeader() {
	return (
		<header className="flex items-center justify-center gap-x-4 py-3">
			<ThemeToggle />
			<BrandHeader />
			<ParaglideLocaleSwitcher />
		</header>
	);
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AuthHeader />
			<main>{children}</main>
		</>
	);
}

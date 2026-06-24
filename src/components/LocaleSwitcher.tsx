// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale

import { Languages } from "lucide-react";
import { getLocale, setLocale } from "#/paraglide/runtime";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ParaglideLocaleSwitcher() {
	const currentLocale = getLocale();
	const langs: {
		code: ReturnType<typeof getLocale>;
		label: string;
		flag: string;
	}[] = [
		{ code: "fr", label: "Français", flag: "🇫🇷" },
		{ code: "ar", label: "العربية", flag: "🇸🇦" },
		{ code: "en", label: "English", flag: "🇬🇧" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="gap-1.5">
					<Languages className="h-4 w-4" />
					<span className="text-xs font-semibold uppercase">
						{currentLocale}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{langs.map((l) => (
					<DropdownMenuItem
						key={l.code}
						onClick={() => setLocale(l.code)}
						className={currentLocale === l.code ? "bg-accent" : ""}
					>
						<span className="me-2">{l.flag}</span>
						{l.label}
						<span className="ms-auto text-xs text-muted-foreground uppercase">
							{l.code}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
		// <div
		// 	style={{
		// 		display: "flex",
		// 		gap: "0.5rem",
		// 		alignItems: "center",
		// 		color: "inherit",
		// 	}}
		// 	// aria-label={m.language_label()}
		// >
		// 	<span style={{ opacity: 0.85 }}>
		// 		{m.current_locale({ locale: currentLocale })}
		// 	</span>
		// 	<div style={{ display: "flex", gap: "0.25rem" }}>
		// 		{locales.map((locale) => {
		// 			return (
		// 				<button
		// 					type="button"
		// 					key={locale}
		// 					onClick={() => setLocale(locale)}
		// 					aria-pressed={locale === currentLocale}
		// 					style={{
		// 						cursor: "pointer",
		// 						padding: "0.35rem 0.75rem",
		// 						borderRadius: "999px",
		// 						border: "1px solid #d1d5db",
		// 						background:
		// 							locale === currentLocale ? "#0f172a" : "transparent",
		// 						color: locale === currentLocale ? "#f8fafc" : "inherit",
		// 						fontWeight: locale === currentLocale ? 700 : 500,
		// 						letterSpacing: "0.01em",
		// 					}}
		// 				>
		// 					{locale.toUpperCase()}
		// 				</button>
		// 			);
		// 		})}
		// 	</div>
		// </div>
	);
}

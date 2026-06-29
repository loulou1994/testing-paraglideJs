import { getRequestHeaders } from "@tanstack/react-start/server";

// parses current cookie locale (if any) onto the server-side
export function getServerLocale() {
	const headers = getRequestHeaders();
	const cookies = headers.get("cookie") || "";
	const match = cookies.match(/PARAGLIDE_LOCALE=([a-zA-Z-]+)/);
	return match ? match[1] : "en";
}

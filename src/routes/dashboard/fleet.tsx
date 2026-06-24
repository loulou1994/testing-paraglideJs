import { createFileRoute } from "@tanstack/react-router";
import { bookings } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/dashboard/fleet")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: m["cars.title"]() },
			{ name: "description", content: m["cars.description"]() },
		],
	}),
});

function nextEvent(carId: string, t: any) {
	const now = new Date().toISOString().slice(0, 10);
	const future = bookings
		.filter(
			(b) =>
				b.carId === carId &&
				b.end >= now &&
				b.status !== "rejected" &&
				b.status !== "cancelled",
		)
		.sort((a, b) => a.start.localeCompare(b.start))[0];
	if (!future) return t("fleet:availableNow");
	if (future.start <= now) return t("fleet:bookedUntil", { date: future.end });
	return t("fleet:nextBooking", { start: future.start, end: future.end });
}

function RouteComponent() {
	return <div>Hello "/dashboard/cars"!</div>;
}

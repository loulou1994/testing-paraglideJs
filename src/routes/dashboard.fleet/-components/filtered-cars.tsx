import { Link } from "@tanstack/react-router";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { CarStatusBadge, ServiceBadge } from "#/components/status-badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { bookings } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";
import type { Car, CarStatus, ServiceType } from "#/types";

function nextEvent(carId: string) {
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
	if (!future) return m["fleet.availableNow"]();
	if (future.start <= now) return m["fleet.bookedUntil"]({ date: future.end });
	return m["fleet.nextBooking"]({ start: future.start, end: future.end });
}

export function FilteredCars({
	name,
	type,
	cars,
	status,
}: {
	name: string;
	type: ServiceType | "all";
	cars: Car[];
	status: CarStatus | "all";
}) {
	const filtered = useMemo(() => {
		return cars.filter((c) => {
			const matchQ =
				!name ||
				`${c.make} ${c.model} ${c.plate}`
					.toLowerCase()
					.includes(name.toLowerCase());
			const matchS = status === "all" || c.status === status;
			const matchT = type === "all" || c.services.includes(type);
			return matchQ && matchS && matchT;
		});
	}, [cars, name, type, status]);

	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{filtered.map((c) => (
				<Card
					key={c.id}
					className="group overflow-hidden border-border bg-card transition hover:border-primary/40"
				>
					<div className="relative h-44 overflow-hidden bg-secondary">
						<img
							src={c.image}
							alt={`${c.make} ${c.model}`}
							loading="lazy"
							className="h-full w-full object-cover transition group-hover:scale-105"
						/>
						<div className="absolute inset-s-3 top-3">
							<CarStatusBadge status={c.status} />
						</div>
						<div className="absolute inset-e-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-mono backdrop-blur">
							{c.plate}
						</div>
					</div>
					<CardContent className="space-y-3 p-4">
						<div className="flex items-start justify-between gap-2">
							<div>
								<div className="font-semibold">
									{c.make} {c.model}
								</div>
								<div className="text-xs text-muted-foreground">
									{c.year} · {c.color} · {c.seats} {m["fleet.seats"]()}
								</div>
							</div>
							<div className="text-right">
								<div className="text-lg font-semibold">${c.dailyRate}</div>
								<div className="text-[10px] uppercase tracking-wider text-muted-foreground">
									{m["fleet.perDay"]()}
								</div>
							</div>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{c.services.map((s) => (
								<ServiceBadge key={s} type={s} />
							))}
						</div>
						<div className="rounded-md bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
							{nextEvent(c.id)}
						</div>
						<div className="flex gap-2 pt-1">
							<Button asChild size="sm" variant="outline" className="flex-1">
								<Link to="car/$carId" params={{ carId: c.id }} className="bg">
									<CalendarDays className="me-1 h-3.5 w-3.5" />{" "}
									{m["fleet.calendar"]()}
								</Link>
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									console.log("editing car details");
									// setOpen(true)
								}}
							>
								<Pencil className="h-3.5 w-3.5" />
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									toast.success(m["fleet.archivedToast"]({ model: c.model }))
								}
							>
								<Trash2 className="h-3.5 w-3.5" />
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
			{filtered.length === 0 && (
				<Card className="border-dashed border-border bg-card/50 md:col-span-2 xl:col-span-3">
					<CardContent className="p-10 text-center text-sm text-muted-foreground">
						{m["fleet.noCars"]()}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

import { ServiceBadge } from "#/components/status-badge";
import { Card, CardContent } from "#/components/ui/card";
import { m } from "#/paraglide/messages";
import type { Car } from "#/types";

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg bg-secondary/60 p-3">
			<div className="text-[10px] uppercase tracking-wider text-muted-foreground">
				{label}
			</div>
			<div className="text-base font-semibold">{value}</div>
		</div>
	);
}

export function CarDetails({ car }: { car: Car }) {
	return (
		<Card className="overflow-hidden border-border bg-card">
			<img
				src={car.image}
				alt={car.model}
				className="h-48 w-full object-cover"
				loading="lazy"
			/>
			<CardContent className="space-y-3 p-5">
				<div>
					<div className="text-xs font-mono text-muted-foreground">
						{car.plate}
					</div>
					<h1 className="text-2xl font-semibold">
						{car.make} {car.model}
					</h1>
					<p className="text-sm text-muted-foreground">
						{car.year} · {car.color} · {car.seats} {m["fleet.seats"]()} ·{" "}
						{m[`fleet.${car.transmission}`]()} · {m[`fleet.${car.fuel}`]()}
					</p>
				</div>
				<div className="flex flex-wrap gap-1.5">
					{car.services.map((s) => (
						<ServiceBadge key={s} type={s} />
					))}
				</div>
				<div className="grid grid-cols-2 gap-3 pt-2">
					<Stat label={m["fleet.dailyRate"]()} value={`$${car.dailyRate}`} />
					{car.transferRate && (
						<Stat
							label={m["fleet.transferRate"]()}
							value={`$${car.transferRate}`}
						/>
					)}
					{car.weddingRate && (
						<Stat
							label={m["fleet.weddingRate"]()}
							value={`$${car.weddingRate}`}
						/>
					)}
					{car.eventRate && (
						<Stat label={m["fleet.eventRate"]()} value={`$${car.eventRate}`} />
					)}
				</div>
				<div>
					<div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
						{m["fleet.features"]()}
					</div>
					<div className="flex flex-wrap gap-1.5">
						{car.features.map((f) => (
							<span
								key={f}
								className="rounded-md bg-secondary px-2 py-1 text-xs"
							>
								{f}
							</span>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

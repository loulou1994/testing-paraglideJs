import { Link } from "@tanstack/react-router";
import { BookingStatusBadge, ServiceBadge } from "#/components/status-badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { bookings, cars } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";

export function RecentBookings() {
	const recent = [...bookings]
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.slice(0, 6);

	return (
		<Card className="border-border bg-card">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-base">
					{m["home.recentBookings"]()}
				</CardTitle>
				<Button asChild variant="ghost" size="sm">
					<Link to="/orders">{m["home.viewAll"]()}</Link>
				</Button>
			</CardHeader>
			<CardContent className="p-0">
				<div className="divide-y divide-border">
					{recent.map((b) => {
						const car = cars.find((c) => c.id === b.carId);
						return (
							<div
								key={b.id}
								className="flex flex-wrap items-center gap-4 px-5 py-3"
							>
								<div className="font-mono text-xs text-muted-foreground w-20">
									{b.id}
								</div>
								<div className="flex items-center gap-2 min-w-0 flex-1">
									<img
										src={car?.image}
										alt={car?.model}
										loading="lazy"
										className="h-8 w-12 rounded object-cover"
									/>
									<div className="min-w-0">
										<div className="text-sm font-medium truncate">
											{b.customer}
										</div>
										<div className="text-xs text-muted-foreground truncate">
											{car?.make} {car?.model}
										</div>
									</div>
								</div>
								<ServiceBadge type={b.type} />
								<div className="text-sm font-semibold w-20 text-right">
									${b.total}
								</div>
								<BookingStatusBadge status={b.status} />
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}

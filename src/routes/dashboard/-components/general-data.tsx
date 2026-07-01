import {
	AlertCircle,
	CarIcon,
	ClipboardList,
	DollarSign,
	TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "#/components/ui/card";
import { m } from "#/paraglide/messages";

export function GeneralData() {
	const stats = [
		{
			label: m["home.activeCars"](),
			value: "12",
			delta: m["home.thisMonth"]({ count: 2 }),
			icon: CarIcon,
		},
		{
			label: m["home.pendingOrders"](),
			value: "7",
			delta: m["home.needsReview"](),
			icon: ClipboardList,
			warn: true,
		},
		{
			label: m["home.monthlyRevenue"](),
			value: "$28,540",
			delta: m["home.mom"]({ pct: 18 }),
			icon: DollarSign,
		},
		{
			label: m["home.utilization"](),
			value: "74%",
			delta: m["home.pts"]({ count: 6 }),
			icon: TrendingUp,
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((s) => (
				<Card key={s.label} className="border-border bg-card">
					<CardContent className="p-5">
						<div className="flex items-center justify-between">
							<div className="text-xs uppercase tracking-wider text-muted-foreground">
								{s.label}
							</div>
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-md ${s.warn ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"}`}
							>
								<s.icon className="h-4 w-4" />
							</div>
						</div>
						<div className="mt-3 text-3xl font-semibold">{s.value}</div>
						<div
							className={`mt-1 text-xs ${s.warn ? "text-warning" : "text-muted-foreground"} flex items-center gap-1`}
						>
							{s.warn && <AlertCircle className="h-3 w-3" />} {s.delta}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

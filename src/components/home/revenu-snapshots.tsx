import { Link } from "@tanstack/react-router";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { cars, revenueChart } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RevenueSnapshots() {
	const chartData = revenueChart.map((r) => ({
		...r,
		total: r.rent + r.transfer + r.wedding + r.event,
	}));

	return (
		<div className="grid gap-4 lg:grid-cols-3">
			<Card className="border-border bg-card lg:col-span-2">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-base">
						{m["home.revenueTitle"]()}
					</CardTitle>
					<Button variant="ghost" size="sm" asChild>
						<Link to="/revenue">{m["home.openReport"]()}</Link>
					</Button>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={260}>
						<AreaChart
							data={chartData}
							margin={{ left: -10, right: 10, top: 5, bottom: 0 }}
						>
							<defs>
								<linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
									<stop
										offset="0%"
										stopColor="oklch(0.80 0.14 80)"
										stopOpacity={0.4}
									/>
									<stop
										offset="100%"
										stopColor="oklch(0.80 0.14 80)"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="oklch(0.30 0.02 250)"
							/>
							<XAxis
								dataKey="month"
								stroke="oklch(0.68 0.02 250)"
								fontSize={12}
							/>
							<YAxis stroke="oklch(0.68 0.02 250)" fontSize={12} />
							<Tooltip
								contentStyle={{
									background: "oklch(0.20 0.018 250)",
									border: "1px solid oklch(0.30 0.02 250)",
									borderRadius: 8,
								}}
							/>
							<Area
								type="monotone"
								dataKey="total"
								stroke="oklch(0.80 0.14 80)"
								fill="url(#g)"
								strokeWidth={2}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card className="border-border bg-card">
				<CardHeader>
					<CardTitle className="text-base">
						{m["home.fleetSnapshot"]()}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{cars.slice(0, 4).map((c) => (
						<Link
							key={c.id}
							to="/cars/$carId"
							params={{ carId: c.id }}
							className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/60"
						>
							<img
								src={c.image}
								alt={c.model}
								loading="lazy"
								className="h-10 w-14 rounded-md object-cover"
							/>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-medium truncate">
									{c.make} {c.model}
								</div>
								<div className="text-xs text-muted-foreground">{c.plate}</div>
							</div>
							<div className="text-xs text-muted-foreground">
								${c.dailyRate}
								{m["home.perDay"]()}
							</div>
						</Link>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

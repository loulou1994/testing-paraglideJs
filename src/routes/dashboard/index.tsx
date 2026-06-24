import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DashboardHeader } from "#/components/dashboard-header";
import { GeneralData } from "#/components/home/general-data";
import { OfferBanner } from "#/components/home/offer-banner";
import { RecentBookings } from "#/components/home/recent-bookings";
import { RevenueSnapshots } from "#/components/home/revenu-snapshots";
import { Button } from "#/components/ui/button";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: m["home.title"]() },
			{ name: "description", content: m["home.description"]() },
		],
	}),
});

function RouteComponent() {
	return (
		<div className="space-y-6 p-6">
			<DashboardHeader
				title={m["home.titlePage"]()}
				subtitle={m["home.subtitle"]()}
				actions={
					<Button
						asChild
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Link to="/cars">
							{m["home.manageFleet"]()}{" "}
							<ArrowUpRight className="ms-1 h-4 w-4" />
						</Link>
					</Button>
				}
			/>
			<OfferBanner />
			<GeneralData />
			<RevenueSnapshots />
			<RecentBookings />
		</div>
	);
}

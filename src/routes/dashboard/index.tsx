import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DashboardHeader } from "#/components/layouts/dashboard";
import { Button } from "#/components/ui/button";
import { m } from "#/paraglide/messages";
import { GeneralData } from "./-components/general-data";
import { OfferBanner } from "./-components/offer-banner";
import { RecentBookings } from "./-components/recent-bookings";
import { RevenueSnapshots } from "./-components/revenu-snapshots";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	// beforeLoad: ({ context, location }) => {
	// 	if (!context.auth?.isAuthenticated) {
	// 		throw redirect({
	// 			to: "/",
	// 			search: {
	// 				// Save current location for redirect after login
	// 				redirect: location.href,
	// 			},
	// 		});
	// 	}
	// },
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
						<Link to="/dashboard/fleet">
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

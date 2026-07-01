import { Link } from "@tanstack/react-router";
import offerBannerImg from "#/assets/images/hero-car-home.jpg";
import { Button } from "#/components/ui/button";
import { m } from "#/paraglide/messages";

export function OfferBanner() {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-border">
			<img
				src={offerBannerImg}
				alt="Luxury car"
				width={1600}
				height={900}
				className="h-48 w-full object-cover md:h-64"
			/>
			<div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
			<div className="absolute inset-0 flex flex-col justify-center gap-2 p-6 md:p-10 max-w-lg">
				<span className="text-xs uppercase tracking-[0.2em] text-primary">
					{m["home.today"]()}
				</span>
				<h2 className="text-2xl font-semibold md:text-3xl">
					{m["home.pickupsReturns"]({ pickups: 3, returns: 2 })}
				</h2>
				<p className="text-sm text-muted-foreground">
					{m["home.nextPickup"]({
						time: "2h 15m",
						customer: "Sara Klein",
						car: "Rolls-Royce Ghost",
						location: "JFK",
					})}
				</p>
				<div className="mt-2 flex gap-2">
					<Button
						asChild
						size="sm"
						variant="default"
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Link to="/orders">{m["home.viewOrders"]()}</Link>
					</Button>
					<Button asChild size="sm" variant="outline">
						<Link to="/revenue">{m["home.revenueReport"]()}</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CarDetails } from "#/components/car/car-details";
import { Button } from "#/components/ui/button";
import { cars } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";
import { CarSchedule } from "#/components/car/car-schedule";

export const Route = createFileRoute("/dashboard/fleet/car/$carid")({
	component: RouteComponent,
	loader: ({ params }) => {
		const car = cars.find((c) => c.id === params.carid);
		if (!car) throw notFound();
		return { car };
	},
});

function RouteComponent() {
	const { car } = Route.useLoaderData();

	return (
		<div className="space-y-6 p-6">
			<Button variant="ghost" size="sm" asChild className="-ms-2">
				<Link to="/dashboard/fleet">
					<ArrowLeft className="me-1 h-4 w-4" /> {m["fleet.back"]()}
				</Link>
			</Button>
			<div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
				<CarDetails car={car} />
        <CarSchedule/>
			</div>
		</div>
	);
}

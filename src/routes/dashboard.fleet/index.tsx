import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "#/components/layouts/dashboard";
import { Button } from "#/components/ui/button";
import { redirectToAuthRoute } from "#/lib/auth-redirect";
import { cars } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";
import type { CarStatus, ServiceType } from "#/types";
import { AddCar } from "./-components/add-car";
import { CarsFilters } from "./-components/cars-filters";
import { FilteredCars } from "./-components/filtered-cars";

export const Route = createFileRoute("/dashboard/fleet/")({
	beforeLoad: ({ context, location }) => {
		redirectToAuthRoute(context, location.href);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [name, setName] = useState("");
	const [type, setType] = useState<ServiceType | "all">("all");
	const [status, setStatus] = useState<CarStatus | "all">("all");
	const [open, setOpen] = useState(false);

	return (
		<div className="space-y-6 p-6">
			<DashboardHeader
				title={m["fleet.titlePage"]()}
				subtitle={m["fleet.subtitle"]({
					total: cars.length,
					active: cars.filter((c) => c.status === "active").length,
				})}
				actions={
					<Button
						onClick={() => setOpen(true)}
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Plus className="me-1 h-4 w-4" /> {m["fleet.addNew"]()}
					</Button>
				}
			/>
			<CarsFilters
				name={name}
				setName={setName}
				type={type}
				setType={setType}
				status={status}
				setStatus={setStatus}
			/>
			<FilteredCars name={name} type={type} status={status} cars={cars} />
			<AddCar open={open} onOpenChange={setOpen} />
		</div>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CarsFilters } from "#/components/cars/cars-filters";
import { FilteredCars } from "#/components/cars/filtered-cars";
import { DashboardHeader } from "#/components/dashboard-header";
import { Button } from "#/components/ui/button";
import { cars } from "#/lib/mock-data";
import { m } from "#/paraglide/messages";
import type { CarStatus, ServiceType } from "#/types";

export const Route = createFileRoute("/dashboard/fleet")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: m["fleet.title"]() },
			{ name: "description", content: m["fleet.description"]() },
		],
	}),
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
		</div>
	);
}

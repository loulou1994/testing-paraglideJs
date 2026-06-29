import { Search } from "lucide-react";
import { m } from "#/paraglide/messages";
import type { CarStatus, ServiceType } from "#/types";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function CarsFilters({
	name,
	setName,
	type,
	setType,
	status,
	setStatus,
}: {
	name: string;
	setName: (name: string) => void;
	type: ServiceType | "all";
	setType: (type: ServiceType | "all") => void;
	status: CarStatus | "all";
	setStatus: (status: CarStatus | "all") => void;
}) {
	return (
		<Card className="border-border bg-card">
			<CardContent className="flex flex-wrap gap-3 p-4">
				<div className="relative min-w-50 flex-1">
					<Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder={m["fleet.searchPlaceholder"]()}
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="ps-9"
					/>
				</div>
				<Select
					value={status}
					onValueChange={(v) => setStatus(v as CarStatus | "all")}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder={m["fleet.status"]()} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{m["fleet.allStatuses"]()}</SelectItem>
						<SelectItem value="active">{m["fleet.active"]()}</SelectItem>
						<SelectItem value="inactive">{m["fleet.inactive"]()}</SelectItem>
						<SelectItem value="maintenance">
							{m["fleet.maintenance"]()}
						</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={type}
					onValueChange={(v) => setType(v as ServiceType | "all")}
				>
					<SelectTrigger className="w-45">
						<SelectValue placeholder={m["fleet.service"]()} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{m["fleet.allServices"]()}</SelectItem>
						<SelectItem value="rent">{m["fleet.rent"]()}</SelectItem>
						<SelectItem value="transfer">{m["fleet.transfer"]()}</SelectItem>
						<SelectItem value="wedding">{m["fleet.wedding"]()}</SelectItem>
						<SelectItem value="event">{m["fleet.event"]()}</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
		</Card>
	);
}

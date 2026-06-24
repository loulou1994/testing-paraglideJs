import { Search } from "lucide-react";
import { useState } from "react";
import { m } from "#/paraglide/messages";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function FilterCars({ children }: { children: React.ReactNode }) {
	const [q, setQ] = useState("");

	return (
		<Card className="border-border bg-card">
			<CardContent className="flex flex-wrap gap-3 p-4">
				<div className="relative min-w-50 flex-1">
					<Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder={m["cars.searchPlaceholder"]()}
						value={q}
						onChange={(e) => setQ(e.target.value)}
						className="ps-9"
					/>
				</div>
				<Select
					value={status}
					onValueChange={(v) => setStatus(v as CarStatus | "all")}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder={t("fleet:status")} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("fleet:allStatuses")}</SelectItem>
						<SelectItem value="active">{t("fleet:active")}</SelectItem>
						<SelectItem value="inactive">{t("fleet:inactive")}</SelectItem>
						<SelectItem value="maintenance">
							{t("fleet:maintenance")}
						</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={type}
					onValueChange={(v) => setType(v as ServiceType | "all")}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder={t("fleet:service")} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("fleet:allServices")}</SelectItem>
						<SelectItem value="rent">{t("fleet:rent")}</SelectItem>
						<SelectItem value="transfer">{t("fleet:transfer")}</SelectItem>
						<SelectItem value="wedding">{t("fleet:wedding")}</SelectItem>
						<SelectItem value="event">{t("fleet:event")}</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
		</Card>
	);
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import { DashboardHeader } from "../dashboard-header";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const getLocaleString = (locale: string) => {
	if (locale === "fr") {
		return "fr-FR";
	} else if (locale === "ar") {
		return "ar-DZ";
	} else {
		return "en-US";
	}
};

const genDaysOfWeeks = (localeString: ReturnType<typeof getLocaleString>) => {
	return Array.from({ length: 7 }, (_, idx) => {
		const baseDate = new Date(2021, 0, 3); // 3 -> sunday as first week
		baseDate.setDate(baseDate.getDate() + idx);
		const weekDay = baseDate
			.toLocaleDateString(localeString, {
				weekday: "short",
			})
			.replace(".", "");
		baseDate.setDate(baseDate.getDate() - idx);

		return weekDay;
	});
};

export function CarSchedule() {
	const locale = getLocaleString(getLocale());
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<Card className="border-border bg-card">
			<CardContent className="p-5">
				<DashboardHeader
					title={selectedDate.toLocaleString(locale, {
						month: "long",
						year: "numeric",
					})}
					actions={
						<div className="flex gap-1">
							<Button
								variant="outline"
								size="icon"
								onClick={() =>
									setSelectedDate(
										new Date(
											selectedDate.getFullYear(),
											selectedDate.getMonth() - 1,
											1,
										),
									)
								}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setSelectedDate(new Date())}
							>
								{m["common.today"]()}
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() =>
									setSelectedDate(
										new Date(
											selectedDate.getFullYear(),
											selectedDate.getMonth() + 1,
											1,
										),
									)
								}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					}
				/>
				<div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
					{genDaysOfWeeks(locale).map((d) => (
						<div key={d} className="py-1">
							{d}
						</div>
					))}
				</div>
				{/* <div className="mt-1 grid grid-cols-7 gap-1">
					{days.map((d, idx) => {
						if (!d.date)
							return <div key={idx} className="aspect-square rounded-md" />;
						const booking = carBookings.find(
							(b) => d.date! >= b.start && d.date! <= b.end,
						);
						const past = d.date < todayStr;
						const isToday = d.date === todayStr;
						return (
							<button
								key={d.date}
								onClick={() => setSelected(d.date)}
								className={cn(
									"relative aspect-square rounded-md border text-xs transition",
									"border-border bg-secondary/40 hover:border-primary/50",
									isToday && "ring-1 ring-primary",
									booking && typeBg[booking.type],
									booking && "text-white border-transparent",
									past && !booking && "opacity-50",
									past && booking && "opacity-70",
								)}
								title={
									booking
										? `${booking.customer} · ${bookingTypeLabel[booking.type]}`
										: undefined
								}
							>
								<span className="absolute start-1 top-1 font-medium">
									{Number(d.date.slice(-2))}
								</span>
							</button>
						);
					})}
				</div> */}

				{/* <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
					{(["rent", "transfer", "wedding", "event"] as ServiceType[]).map(
						(tName) => (
							<div key={tName} className="flex items-center gap-1.5">
								<span className={cn("h-3 w-3 rounded-sm", typeBg[tName])} />
								{bookingTypeLabel[tName]}
							</div>
						),
					)}
					<div className="flex items-center gap-1.5">
						<span className="h-3 w-3 rounded-sm bg-muted" />{" "}
						{t("fleet:blocked")}
					</div>
				</div> */}
			</CardContent>
		</Card>
	);
}

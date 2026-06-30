import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { bookingTypeLabel } from "#/lib/mock-data";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import type { Booking, Car, ServiceType } from "#/types";
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

const genDaysOfMonth = (currentYear: number, currentMonth: number) => {
	const firsDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const daysOfCurrentMonthCount = new Date(
		currentYear,
		currentMonth - 1,
		0,
	).getDate();

	const daysToSkip = Array.from({ length: firsDayOfMonth }).map((_, idx) => {
		return { id: idx + 1, date: null };
	});

	const daysOfCurrentMonth = Array.from({
		length: daysOfCurrentMonthCount,
	}).map((_, idx) => {
		return {
			id: daysToSkip.length + 1 + idx,
			date: new Date(currentYear, currentMonth, idx + 1),
		};
	});

	return (daysToSkip as { id: number; date: null | Date }[]).concat(
		daysOfCurrentMonth,
	);
};

export function CarSchedule({
	carBookings,
	carData,
}: {
	carBookings: Booking[];
	carData: Car;
}) {
	const locale = getLocaleString(getLocale());
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const daysOfSelectedMonth = useMemo(() => {
		return genDaysOfMonth(currentDate.getFullYear(), currentDate.getMonth());
	}, [currentDate]);
	const bookingDatesOfCar = useMemo(() => {
		return carBookings.filter(({ carId }) => {
			return carId === carData.id;
		});
	}, [carBookings, carData]);

	const typeBg: Record<ServiceType, string> = {
		rent: "bg-[color:var(--rent)]/80",
		transfer: "bg-[color:var(--transfer)]/80",
		wedding: "bg-[color:var(--wedding)]/80",
		event: "bg-[color:var(--event)]/80",
	};

	return (
		<Card className="border-border bg-card">
			<CardContent className="p-5">
				<DashboardHeader
					title={currentDate.toLocaleString(locale, {
						month: "long",
						year: "numeric",
					})}
					actions={
						<div className="flex gap-1">
							<Button
								variant="outline"
								size="icon"
								onClick={() =>
									setCurrentDate(
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth() - 1,
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
								onClick={() => setCurrentDate(new Date())}
							>
								{m["common.today"]()}
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() =>
									setCurrentDate(
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth() + 1,
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
				<div className="mt-1 grid grid-cols-7 gap-1">
					{daysOfSelectedMonth.map((dateData) => {
						if (!dateData.date) {
							return (
								<div key={dateData.id} className="aspect-square rounded-md" />
							);
						}

						const dateInMls = dateData.date.getTime();
						const booking = bookingDatesOfCar.find((currentBooking) => {
							return (
								dateInMls >= new Date(currentBooking.start).getTime() &&
								dateInMls <= new Date(currentBooking.end).getTime()
							);
						});

						const past =
							dateInMls < new Date(new Date().toDateString()).getTime();
						const isToday =
							dateInMls === new Date(new Date().toDateString()).getTime();

						return (
							<button
								type="button"
								key={dateData.id}
								onClick={() => {
									setSelectedDate(dateData.date);
								}}
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
								<span className="absolute inset-s-1 top-1 font-medium">
									{dateData.date.getDate()}
								</span>
							</button>
						);
					})}
				</div>

				<div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
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
						{m["fleet.blocked"]()}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

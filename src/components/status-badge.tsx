import { cn } from "#/lib/utils";
import type { BookingStatus, CarStatus, ServiceType } from "#/types";
import { Badge } from "./ui/badge";

const carStatus: Record<CarStatus, string> = {
  active: "bg-success/15 text-success border-success/30",
  inactive: "bg-muted text-muted-foreground border-border",
  maintenance: "bg-warning/15 text-warning border-warning/30",
};

const bookingStatus: Record<BookingStatus, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  confirmed: "bg-info/15 text-info border-info/30",
  ongoing: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-success/15 text-success border-success/30",
  cancelled: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
};

const serviceStyle: Record<ServiceType, string> = {
  rent: "bg-[color:var(--rent)]/15 text-[color:var(--rent)] border-[color:var(--rent)]/30",
  transfer: "bg-[color:var(--transfer)]/15 text-[color:var(--transfer)] border-[color:var(--transfer)]/30",
  wedding: "bg-[color:var(--wedding)]/15 text-[color:var(--wedding)] border-[color:var(--wedding)]/30",
  event: "bg-[color:var(--event)]/15 text-[color:var(--event)] border-[color:var(--event)]/30",
};

export function CarStatusBadge({ status }: { status: CarStatus }) {
  return <Badge variant="outline" className={cn("capitalize", carStatus[status])}>{status}</Badge>;
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant="outline" className={cn("capitalize", bookingStatus[status])}>{status}</Badge>;
}

export function ServiceBadge({ type }: { type: ServiceType }) {
  const label = { rent: "Rent", transfer: "VIP Transfer", wedding: "Wedding", event: "Event" }[type];
  return <Badge variant="outline" className={cn(serviceStyle[type])}>{label}</Badge>;
}

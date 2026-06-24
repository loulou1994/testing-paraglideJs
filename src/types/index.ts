export type CarStatus = "active" | "inactive" | "maintenance";

export type ServiceType = "rent" | "transfer" | "wedding" | "event";

export type BookingStatus =
	| "pending"
	| "confirmed"
	| "ongoing"
	| "completed"
	| "cancelled"
	| "rejected";

export type PriceType =
	| "per_day"
	| "per_trip"
	| "per_booking"
	| "per_passenger"
	| "per_extra_driver"
	| "per_15min";

export type FuelPolicy = "full_to_full" | "full_to_empty" | "prepaid" | "same_level" | "none";

export interface BookingExtra {
	id: string;
	name: string;
	priceType: PriceType;
	price: number;
	qty?: number;
}

export interface Booking {
	id: string;
	carId: string;
	customer: string;
	customerEmail: string;
	customerPhone: string;
	type: ServiceType;
	start: string;
	end: string;
	pickup?: string;
	dropoff?: string;
	pickupAt?: string;
	dropoffAt?: string;
	total: number;
	status: BookingStatus;
	createdAt: string;
	withDriver?: boolean;
	passengers?: number;
	licenseNumber?: string;
	licenseCountry?: string;
	specialRequests?: string;
	oneWay?: boolean;
	delivery?: boolean;
	deliveryAddress?: string;
	mileageLimit?: number;
	fuelPolicy?: FuelPolicy;
	extras?: BookingExtra[];
}

export interface Car {  
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  image: string;
  status: CarStatus;
  services: ServiceType[];
  dailyRate: number;
  transferRate?: number;
  weddingRate?: number;
  eventRate?: number;
  seats: number;
  transmission: "Auto" | "Manual";
  fuel: string;
  features: string[];
}
import * as z from "zod";
import { m } from "#/paraglide/messages";

export const basicSchema = z.object({
	brand: z
		.string()
		.min(
			10,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.brand"](),
				count: 10,
			}),
		)
		.max(
			60,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.brand"](),
				count: 60,
			}),
		),
	model: z
		.string()
		.min(
			10,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.model"](),
				count: 10,
			}),
		)
		.max(
			60,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.model"](),
				count: 60,
			}),
		),
	year: z.coerce
		.number()
		.int()
		.gte(1900, {
			error: m["validationError.lessThanMin"]({
				count: 1900,
				name: m["fleet.addCarForm.year"](),
			}),
		})
		.lte(new Date().getFullYear(), {
			error: m["validationError.moreThanMax"]({
				count: new Date().getFullYear(),
				name: m["fleet.addCarForm.year"](),
			}),
		}),
	color: z
		.string()
		.min(
			4,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.color"](),
				count: 10,
			}),
		)
		.max(
			20,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.color"](),
				count: 60,
			}),
		),
	licensePlate: z
		.string()
		.min(
			15,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.licensePlate"](),
				count: 10,
			}),
		)
		.max(
			30,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.licensePlate"](),
				count: 60,
			}),
		),
	vin: z
		.string()
		.min(
			15,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.vin"](),
				count: 10,
			}),
		)
		.max(
			30,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.vin"](),
				count: 60,
			}),
		)
		.optional(),
	transmission: z.enum(["automatic", "manual"], {
		error: m["validationError.chooseValue"],
	}),
	seats: z.coerce
		.number()
		.int()
		.gte(1, {
			error: m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.seats"](),
				count: 1,
			}),
		})
		.lte(8, {
			error: m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.seats"](),
				count: 8,
			}),
		}),
});

export type AddCarFormInputs = z.input<typeof addCarFormSchema>;

export const addCarFormSchema = basicSchema;

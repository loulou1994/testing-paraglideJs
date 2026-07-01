import * as z from "zod";
import { m } from "#/paraglide/messages";

export const basicSchema = z.object({
	brand: z
		.string()
		.min(
			10,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.brand"],
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
	model: z.string(),
	year: z.coerce.number().int().gte(1900).lte(new Date().getFullYear()),
	color: z.string(),
	licensePlate: z
		.string()
		.min(
			15,
			m["validationError.lessThanMin"]({
				name: m["fleet.addCarForm.brand"],
				count: 10,
			}),
		)
		.max(
			50,
			m["validationError.moreThanMax"]({
				name: m["fleet.addCarForm.brand"](),
				count: 60,
			}),
		),
	vin: z.string().optional(),
	transmission: z.enum(["automatic", "manual"]),
	seats: z.coerce.number().int().lte(8),
});

export type AddCarForm = z.infer<typeof addCarFormSchema>;

export const addCarFormSchema = basicSchema;
export const validateAddCarForm = (values: unknown) => {
	const result = addCarFormSchema.safeParse(values);
	return result.success ? undefined : result.error.flatten();
};
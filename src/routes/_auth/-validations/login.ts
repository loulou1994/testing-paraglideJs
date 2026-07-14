import z from "zod";
import { m } from "#/paraglide/messages";

export const loginSchema = z.object({
	email: z.email({ error: m["validationError.invalidEmail"]() }),
	password: z
		.string()
		.trim()
		.min(1, { message: m["validationError.fieldRequired"]() }),
});

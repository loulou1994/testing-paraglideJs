import * as z from "zod";
import { m } from "#/paraglide/messages";

const basicSchema = z.object({
	make: z
		.string()
		.min(10, m["validationError.lessThanMin"]({ name: "make", count: 10 })),
});

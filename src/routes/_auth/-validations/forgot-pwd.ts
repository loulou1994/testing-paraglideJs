import z from "zod";
import { m } from "#/paraglide/messages";

export const forgotPwdStep1Schema = z.object({
	email: z.email({ error: m["validationError.invalidEmail"]() }),
});

export const forgotPwdStep2Schema = z.object({
	otpInput: z.string().min(8, {
		message: m["validationError.lessThanMin"]({
			count: 8,
			name: m["login.code"](),
		}),
	}),
});

export const forgotPwdStep3Schema = z.object({
	resetPwd: z
		.string()
		.trim()
		.min(8, {
			message: m["validationError.lessThanMin"]({
				count: 8,
				name: m["login.code"](),
			}),
		}),
});

export type ForgotPwdStep1Payload = z.infer<typeof forgotPwdStep1Schema>;
export type ForgotPwdStep2Payload = z.infer<typeof forgotPwdStep2Schema>;
export type ForgotPwdStep3Paylod = z.infer<typeof forgotPwdStep3Schema>

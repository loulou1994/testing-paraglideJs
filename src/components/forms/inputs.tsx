import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useFieldContext } from "#/contexts/custom-form-hook-ctx";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export function FormOTPField() {
	const field = useFieldContext();

	return (
		<Field>
			<InputOTP
				maxLength={6}
				containerClassName="gap-x-2 sm:gap-x-0 justify-evenly rtl:flex-row-reverse"
				className=""
				pattern={REGEXP_ONLY_DIGITS}
				// onChange={(newValue) => {
				// 	setOtpCode(newValue);
				// }}
			>
				<InputOTPGroup className="bg-red">
					<InputOTPSlot index={0} />
				</InputOTPGroup>
				<InputOTPGroup>
					<InputOTPSlot index={1} />
				</InputOTPGroup>
				<InputOTPGroup>
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPGroup>
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPGroup>
					<InputOTPSlot index={4} />
				</InputOTPGroup>
				<InputOTPGroup>
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>

			{field.state.meta.errors && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	);
}

export function FormTextField({
	labelTitle,
	placeholder,
	type = "text",
}: {
	labelTitle: string;
	placeholder: () => string;
	type?: string;
}) {
	const field = useFieldContext<string>();

	return (
		<Field>
			<FieldLabel htmlFor={labelTitle} className="capitalize">
				{labelTitle}
			</FieldLabel>
			<Input
				value={field.state.value}
				placeholder={placeholder()}
				type={type}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.errors && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	);
}

export function FormNumberField({
	labelTitle,
	placeholder,
}: {
	labelTitle: string;
	placeholder: () => string;
}) {
	const field = useFieldContext<string>();
	return (
		<Field>
			<FieldLabel htmlFor={labelTitle} className="capitalize">
				{labelTitle}
			</FieldLabel>
			<Input
				value={field.state.value}
				type="number"
				placeholder={placeholder()}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.errors && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	);
}

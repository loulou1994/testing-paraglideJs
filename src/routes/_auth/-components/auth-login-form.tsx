import { useForm } from "@tanstack/react-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { m } from "#/paraglide/messages";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { loginSchema } from "../-validations/login";

export function AuthLoginForm() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
	});

	return (
		<Card className="bg-transparent border-0 items-center lg:items-stretch lg:gap-y-5 shadow-none py-0">
			<CardHeader className="gap-y-0 text-center lg:text-start lg:px-0">
				<CardTitle className="text-2xl sm:text-3xl lg:text-[clamp(1.875rem,2.3vw,2rem)] capitalize">
					<h1>Put your rental business on autopilot</h1>
				</CardTitle>
				<CardDescription className="text-lg sm:text-xl lg:text-[clamp(1.25rem,1.7vw,1.5rem)]">
					Track your fleet, adjust pricing, and maximize your earnings all from
					one high-powered dashboard.
				</CardDescription>
			</CardHeader>
			<CardContent className="w-90 max-w-md lg:w-auto lg:px-0">
				<form
					id="login-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="email"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="md:text-base">
											{m["login.email"]()}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder={m["login.emailPlaceholder"]()}
											autoComplete="off"
											className="py-3 h-auto md:text-base"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="password"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name} className="md:text-base">
											{m["login.password"]()}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder={m["login.passwordPlaceholder"]()}
											autoComplete="off"
											className="py-3 h-auto md:text-base"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="lg:w-auto w-90 max-w-md lg:px-0">
				<Field orientation="horizontal">
					<Button
						type="submit"
						form="login-form"
						className="w-full h-auto py-3 md:text-base"
					>
						{m["login.login"]()}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}

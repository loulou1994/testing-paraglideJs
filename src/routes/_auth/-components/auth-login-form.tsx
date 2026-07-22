import { useForm } from "@tanstack/react-form";
import { useLogin } from "#/apis/use-login-api";
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
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { loginSchema } from "../-validations/login";
import { ForgotPwd } from "./auth-forgot-pwd";

export function AuthLoginForm() {
	const { mutate, isPending } = useLogin();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: ({ value }) => {
			const parsedSchema = loginSchema.parse(value);
			mutate(parsedSchema);
		},
	});

	return (
		<Card className="bg-transparent border-0 items-center lg:items-stretch shadow-none py-0 lg:gap-y-7">
			<CardHeader className="gap-y-3 items-center lg:items-start lg:px-0 text-center lg:text-start">
				<CardTitle className="text-2xl sm:text-3xl  capitalize lg:text-[clamp(3.125rem,4.7vw,4.25rem)] lg:font-extrabold lg:leading-none w-76.75 lg:w-[min(46.6875rem,60.1vw)]">
					<h1>{m["login.heading"]()}</h1>
				</CardTitle>
				<CardDescription className="text-lg sm:text-xl lg:text-[clamp(1.25rem,1.7vw,1.5rem)] w-81.75 sm:w-118.75 lg:w-[min(45.5rem,61.35vw)]">
					{m["login.subheading"]()}
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
											className="py-3 h-auto md:text-base lg:w-[min(calc(50px+23.55vw),448px)]!"
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
											className="py-3 h-auto md:text-base lg:w-[min(calc(50px+23.55vw),448px)]!"
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
				<ForgotPwd className="mt-2 text-muted-foreground cursor-pointer" dir="ltr"/>
			</CardContent>
			<CardFooter className="lg:w-auto w-90 max-w-md lg:px-0">
				<Field orientation="horizontal">
					<Button
						type="submit"
						form="login-form"
						className="w-full h-auto py-3 md:text-base lg:w-[min(calc(50px+23.55vw),448px)]!"
						disabled={isPending}
					>
						{m["login.login"]()}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}

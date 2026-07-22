import {
	createFormHook,
	createFormHookContexts,
	formOptions,
} from "@tanstack/react-form";
import { FormNumberField, FormOTPField, FormTextField } from "#/components/forms/inputs";
import { FormSelectField } from "#/components/forms/select";
import type { AddCarFormInputs } from "#/routes/dashboard.fleet/-validations/add-car";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		FormOTPField,
		FormTextField,
		FormSelectField,
		FormNumberField,
	},
	fieldContext,
	formComponents: {},
	formContext,
});

export const addCarFormOpts = formOptions({
	defaultValues: {
		brand: "",
		model: "",
		year: 0,
		color: "",
		licensePlate: "",
		vin: "",
		transmission: "" as "automatic" | "manual",
		seats: 0,
	},
} as { defaultValues: AddCarFormInputs });

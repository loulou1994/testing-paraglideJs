import {
	createFormHook,
	createFormHookContexts,
	formOptions,
} from "@tanstack/react-form";
import {
	FormSelectField,
	FormTextField,
} from "#/components/forms/add-car-inputs";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		FormTextField,
		FormSelectField,
	},
	fieldContext,
	formComponents: {},
	formContext,
});

export const addCarFormOpts = formOptions({
	defaultValues: {
		brand: "",
		model: "",
		year: "",
		color: "",
		licensePlate: "",
		vin: "",
		transmission: "",
		seats: "",
	},
});

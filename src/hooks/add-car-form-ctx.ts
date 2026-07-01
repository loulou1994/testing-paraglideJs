import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";
import { FormTextField } from "#/components/forms/add-car-input";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		FormTextField,
	},
    fieldContext,
    formComponents: {},
    formContext
})

export const addCarFormOpts = formOptions({
  defaultValues: {
    brand: '',
    model: '',
    year: 1900,
    color: "",
    licensePlate: '',
	vin: "",
	transmission: "",
	seats: 0
  },
})
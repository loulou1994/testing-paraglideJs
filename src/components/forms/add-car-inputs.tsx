import { useFieldContext } from "#/hooks/add-car-form-ctx";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function FormTextField({
	labelTitle,
	placeholder,
	inputId,
}: {
	labelTitle: string;
	placeholder: string;
	value?: string;
	inputId: string;
}) {
	const field = useFieldContext<string>();
	return (
		<Field>
			<FieldLabel htmlFor={labelTitle}>{labelTitle}</FieldLabel>
			<Input
				id={inputId}
				value={field.state.value}
				placeholder={placeholder}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.errors && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	);
}

export function FormSelectField({ items, labelTitle }: { items: Record<string, any>[], labelTitle: string }) {
	<Field>
		<FieldLabel htmlFor={labelTitle}>{labelTitle}</FieldLabel>
		
	</Field>
}

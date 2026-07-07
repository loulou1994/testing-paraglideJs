import { useFieldContext } from "#/contexts/add-car-form-ctx";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function FormTextField({
	labelTitle,
	placeholder,
	// inputId,
}: {
	labelTitle: string;
	placeholder: () => string;
	// inputId: string;
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

export function FormSelectField({
	items,
	labelTitle,
	placeholder,
}: {
	items: { label: () => string; value: string }[];
	labelTitle: string;
	placeholder: () => string;
}) {
	const field = useFieldContext<string>();

	return (
		<Field>
			<FieldLabel htmlFor={labelTitle} className="capitalize">
				{labelTitle}
			</FieldLabel>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder()} />
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{field.state.meta.errors && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	);
}

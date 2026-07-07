import { useFieldContext } from "#/hooks/add-car-form-ctx";
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
			<FieldLabel htmlFor={labelTitle} className="capitalize">
				{labelTitle}
			</FieldLabel>
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

export function FormSelectField({
	items,
	labelTitle,
}: {
	items: { label: () => string; value: string }[];
	labelTitle: string;
}) {
	return (
		<Field>
			<FieldLabel htmlFor={labelTitle}>{labelTitle}</FieldLabel>
			<Select items={items}>
				<SelectTrigger className="w-full max-w-48">
					<SelectValue placeholder={"select transmission"}/>
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Field>
	);
}

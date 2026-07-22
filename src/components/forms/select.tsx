import { useFieldContext } from "#/contexts/custom-form-hook-ctx";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

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

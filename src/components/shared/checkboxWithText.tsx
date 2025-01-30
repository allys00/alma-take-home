import { Checkbox } from '../ui/checkbox';

interface CheckboxWithTextProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
}

export function CheckboxWithText({
  label,
  ...checkboxProps
}: CheckboxWithTextProps) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox {...checkboxProps} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={checkboxProps.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </div>
  );
}

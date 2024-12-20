import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  pattern?: string;
}

export function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  pattern
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-700">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        pattern={pattern}
        className="border-2 focus:border-orange-200 bg-white"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
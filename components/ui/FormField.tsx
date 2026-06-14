import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={htmlFor} className="text-sm lg:text-lg text-primary-dark">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm lg:text-lg text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

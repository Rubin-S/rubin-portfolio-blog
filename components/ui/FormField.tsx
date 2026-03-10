interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
  className = "space-y-2",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>

      {children}

      {hint ? (
        <p className="text-[0.8rem] text-muted-foreground">{hint}</p>
      ) : null}

      {error ? (
        <div className="text-sm text-destructive font-medium">{error}</div>
      ) : null}
    </div>
  );
}

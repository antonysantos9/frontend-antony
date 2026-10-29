import { ComponentProps } from "react";
import "./Input.css";

interface Props extends ComponentProps<"input"> {
  label?: string;
  caption?: string;
  error?: string;
  required?: boolean;
  variant?:
    | "default"
    | "rounded"
    | "textArea"
    | "select"
    | "radioButton"
    | "selectButton";
}

export default function Input({
  id,
  label,
  caption,
  error,
  required = false,
  variant = "default",
  ...props
}: Props) {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">
        {label}
        {required && <span className="input-required">*</span>}
      </label>

      <input
        id={id}
        {...props}
        className={`input-field input-${variant} ${
          error ? "input-error" : ""
        }`}
      />

      <p className={`input-caption ${error ? "caption-error" : ""}`}>
        {error || caption}
      </p>
    </div>
  );
}
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "secondary", className, ...props }: ButtonProps) {
  return <button className={cn("btn", `btn-${variant}`, className)} {...props} />;
}

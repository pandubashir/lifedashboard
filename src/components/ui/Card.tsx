import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("card", className)} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
}

export function CardHeader({ icon, title, action }: CardHeaderProps) {
  return (
    <div className="card-header">
      <span className="card-title">
        {icon}
        {title}
      </span>
      {action}
    </div>
  );
}

export function CardBody({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("card-body", className)} {...props}>
      {children}
    </div>
  );
}

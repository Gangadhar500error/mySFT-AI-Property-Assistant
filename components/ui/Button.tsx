import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-gray-900 text-white hover:bg-gray-800 shadow-sm active:scale-[0.98]",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm active:scale-[0.98]",
  ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  outline:
    "border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

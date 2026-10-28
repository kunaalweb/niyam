import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "minimal";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  showArrow?: boolean;
  arrowType?: "right" | "up-right";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  showArrow = false,
  arrowType = "right",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // Base classes with accessibility, transitions, and touch-target minimums
  const baseClasses =
    "group inline-flex items-center justify-center font-mono-label font-bold tracking-ultra rounded-sm transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

  // Size variations
  const sizeClasses = {
    sm: "text-[11px] px-3.5 py-2 gap-2 min-h-[36px]",
    md: "text-xs px-6 py-3.5 gap-2.5 min-h-[44px]",
    lg: "text-xs md:text-sm px-8 py-4 gap-3 min-h-[48px]",
  }[size];

  // Variant aesthetics matching the monochromatic film-noir identity
  const variantClasses = {
    // Primary: Off-white background with dark text, transforms to warm amber on hover
    primary:
      "bg-primary text-[#080808] hover:bg-accent-warm hover:text-white border border-transparent shadow-sm",
    // Secondary: Transparent with thin border, hover fill and warm accent
    secondary:
      "bg-transparent text-primary border border-white/15 hover:border-accent-warm/70 hover:text-white hover:bg-white/[0.04]",
    // Minimal: Editorial text style with subtle underline/arrow movement
    minimal:
      "bg-transparent text-secondary hover:text-primary p-0 min-h-0 border-none rounded-none tracking-wider font-medium",
  }[variant];

  const ArrowIcon = arrowType === "up-right" ? ArrowUpRight : ArrowRight;
  const arrowAnimationClass =
    arrowType === "up-right"
      ? "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      : "transition-transform duration-300 group-hover:translate-x-1";

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowIcon
          size={size === "sm" ? 13 : 15}
          className={`${arrowAnimationClass} text-current shrink-0`}
          aria-hidden="true"
        />
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  // If external link
  if (href && isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        aria-label={props["aria-label"]}
      >
        {content}
      </a>
    );
  }

  // If internal route link
  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  // Default interactive button
  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}

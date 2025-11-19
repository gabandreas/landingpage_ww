import Link from "next/link";
import type { ReactNode } from "react";


type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;

  // tambah ini ⬇
  target?: string;
  rel?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#007aff] text-white shadow-[0_15px_45px_rgba(0,122,255,0.35)] hover:bg-[#1a80ff] hover:shadow-[0_18px_55px_rgba(0,122,255,0.45)] focus-visible:ring-[#28c2ff]",
  secondary:
    "border border-white/20 text-white/90 hover:text-white hover:border-white/50 bg-white/5 focus-visible:ring-white/60",
  ghost:
    "text-[#b3b3b3] hover:text-white hover:bg-white/5 focus-visible:ring-white/40",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,     // ⬅ tambahan
  rel,        // ⬅ tambahan
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}   // ⬅ forward props
      rel={rel}         // ⬅ forward props
      className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}

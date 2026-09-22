"use client";

import clsx from "clsx";
import styles from "./Button.module.css";

type Variants = "primary" | "secondary" | "ghost" | "danger";
type Sizes = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variants;
  size?: Sizes;
  loading?: boolean;
}

interface AnchorProps extends SharedProps, React.ComponentPropsWithRef<"a"> {
  href: string;
  as: "a";
  type?: never;
}

interface ButtonElementProps
  extends SharedProps,
    React.ComponentPropsWithRef<"button"> {
  href?: never;
  as?: "button";
}

export type ButtonProps = AnchorProps | ButtonElementProps;

export function Button(props: ButtonProps) {
  const {
    as,
    children,
    className,
    size = "md",
    variant = "primary",
    loading = false,
  } = props;

  if (as === "a") {
    const { href, onClick, ref, ...rest } = props;
    return (
      <a
        href={href}
        className={clsx(styles.button, className)}
        data-variant={variant}
        data-size={size}
        aria-busy={loading}
        aria-disabled={loading}
        onClick={loading ? undefined : onClick}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { onClick, ref, ...rest } = props;

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      aria-busy={loading}
      aria-disabled={loading}
      onClick={loading ? undefined : onClick}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
}

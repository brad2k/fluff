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
  extends SharedProps, React.ComponentPropsWithRef<"button"> {
  href?: never;
  as?: "button";
}

export type ButtonProps = AnchorProps | ButtonElementProps;

export function Button(props: ButtonProps) {
  if (props.as === "a") {
    const {
      as: _as, // pulling out 'as' so it doesn't get spread
      variant = "primary",
      size = "md",
      loading = false,
      className,
      onClick,
      children,
      ...rest
    } = props;

    return (
      <a
        {...rest}
        className={clsx(styles.button, className)}
        data-variant={variant}
        data-size={size}
        aria-busy={loading}
        aria-disabled={loading}
        onClick={loading ? (event) => event.preventDefault() : onClick}
      >
        {children}
      </a>
    );
  }

  const {
    as: _as, // pulling out 'as' so it doesn't get spread
    variant = "primary",
    size = "md",
    loading = false,
    className,
    onClick,
    type = "button",
    children,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-size={size}
      aria-busy={loading}
      aria-disabled={loading}
      onClick={loading ? undefined : onClick}
    >
      {children}
    </button>
  );
}

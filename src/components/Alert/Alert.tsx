"use client";

import clsx from "clsx";
import styles from "./Alert.module.css";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../Button";

type AlertVariants = "info" | "success" | "warning" | "danger";

export interface AlertProps extends React.ComponentPropsWithRef<"section"> {
  variant: AlertVariants;
  title?: string;
  titleLevel?: "h2" | "h3" | "h4" | "h5";
  dismissible?: boolean;
}

export function Alert({
  children,
  className,
  dismissible,
  title,
  titleLevel = "h2",
  variant,
  ...rest
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const HeadingLevel = titleLevel;

  return (
    isVisible && (
      <section
        {...rest}
        role={
          variant === "danger" || variant === "warning" ? "alert" : "status"
        }
        className={clsx(styles.alert, className)}
        data-variant={variant}
      >
        {(title || dismissible) && (
          <header className={styles.header}>
            {title && (
              <HeadingLevel className={styles.title}>{title}</HeadingLevel>
            )}
            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                <X className={styles.closeIcon} />
                <span className="visually-hidden">Close</span>
              </Button>
            )}
          </header>
        )}
        {children}
      </section>
    )
  );
}

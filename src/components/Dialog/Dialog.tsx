"use client";

import clsx from "clsx";
import styles from "./Dialog.module.css";
import { X } from "lucide-react";
import { Button } from "../Button";
import { useEffect, useRef } from "react";

export interface DialogProps extends React.ComponentPropsWithRef<"dialog"> {
  closeOnBackdropClick?: boolean;
  open?: boolean;
  title?: string;
  titleLevel?: "h2" | "h3" | "h4" | "h5";
}

export function Dialog({
  children,
  className,
  closeOnBackdropClick = true,
  open,
  ref,
  title,
  titleLevel = "h2",
  ...rest
}: DialogProps) {
  const HeadingLevel = titleLevel;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || open === undefined) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      {...rest}
      className={clsx(styles.dialog, className)}
      ref={(el) => {
        dialogRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) ref.current = el;
      }}
    >
      <header className={styles.header}>
        {title && <HeadingLevel className={styles.title}>{title}</HeadingLevel>}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => dialogRef.current?.close()}
        >
          <X className={styles.closeIcon} />
          <span className="visually-hidden">Close</span>
        </Button>
      </header>

      {children}
    </dialog>
  );
}

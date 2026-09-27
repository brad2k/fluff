"use client";

import clsx from "clsx";
import styles from "./Dialog.module.css";
import { useCallback, createContext, useEffect, useId, useRef } from "react";

export interface DialogProps extends React.ComponentPropsWithRef<"dialog"> {
  closeOnBackdropClick?: boolean;
  open?: boolean;
}

export const DialogContext = createContext<{
  requestClose: () => void;
  titleId: string;
} | null>(null);

export function Dialog({
  children,
  className,
  closeOnBackdropClick = true,
  open,
  ref,
  ...rest
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Firefox doesn't defer removing a closed <dialog> from the top layer to
  // let CSS transitions play, unlike Chrome, so the close animation is
  // driven here: mark it closing, let the transition run, then close it for
  // real once it's already invisible.
  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || dialog.hasAttribute("data-closing")) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    dialog.setAttribute("data-closing", "");

    const finishClose = () => {
      clearTimeout(fallback);
      dialog.removeEventListener("transitionend", handleTransitionEnd);
      dialog.removeAttribute("data-closing");
      dialog.close();
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (
        event.target === dialog &&
        event.propertyName === "opacity" &&
        !event.pseudoElement
      ) {
        finishClose();
      }
    };

    dialog.addEventListener("transitionend", handleTransitionEnd);
    const fallback = setTimeout(finishClose, 250);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (closeOnBackdropClick && e.target === dialogRef.current) {
      requestClose();
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [requestClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || open === undefined) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) requestClose();
  }, [open, requestClose]);

  return (
    <dialog
      {...rest}
      className={clsx(styles.dialog, className)}
      data-open={open}
      onClick={handleClick}
      ref={(el) => {
        dialogRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) ref.current = el;
      }}
      aria-labelledby={titleId}
    >
      <DialogContext value={{ requestClose, titleId }}>
        <div className={styles.dialogContent}>{children}</div>
      </DialogContext>
    </dialog>
  );
}

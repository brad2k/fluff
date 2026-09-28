import clsx from "clsx";
import styles from "./DialogFooter.module.css";

export interface DialogFooterProps extends React.ComponentPropsWithoutRef<"footer"> {
  children: React.ReactNode;
}

export function DialogFooter({
  children,
  className,
  ...rest
}: DialogFooterProps) {
  return (
    <footer {...rest} className={clsx(styles.dialogFooter, className)}>
      {children}
    </footer>
  );
}

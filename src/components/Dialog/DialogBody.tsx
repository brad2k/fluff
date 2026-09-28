import clsx from "clsx";
import styles from "./DialogBody.module.css";

export interface DialogBodyProps extends React.ComponentPropsWithoutRef<"section"> {}

export function DialogBody({ children, className, ...rest }: DialogBodyProps) {
  return (
    <section {...rest} className={clsx(styles.dialogBody, className)}>
      {children}
    </section>
  );
}

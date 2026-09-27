import clsx from "clsx";
import styles from "./DialogHeader.module.css";
import { Button } from "../Button";
import { X } from "lucide-react";
import { useContext } from "react";
import { DialogContext } from "./Dialog";

export interface DialogHeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  title: string;
  titleLevel?: "h2" | "h3" | "h4" | "h5";
}

export function DialogHeader({
  className,
  title,
  titleLevel = "h2",
  ...rest
}: DialogHeaderProps) {
  const HeadingLevel = titleLevel;
  const context = useContext(DialogContext);

  return (
    <header {...rest} className={clsx(styles.dialogHeader, className)}>
      {title && (
        <HeadingLevel className={styles.title} id={context?.titleId}>
          {title}
        </HeadingLevel>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={context?.requestClose ? context.requestClose : undefined}
      >
        <X className={styles.closeIcon} />
        <span className="visually-hidden">Close</span>
      </Button>
    </header>
  );
}

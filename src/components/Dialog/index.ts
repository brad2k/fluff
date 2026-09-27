export type { DialogProps } from "./Dialog";

import { Dialog as DialogRoot } from "./Dialog";
import { DialogBody } from "./DialogBody";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";

export const Dialog = {
  Root: DialogRoot,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
};

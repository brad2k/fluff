import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { DialogProps } from "./";
import { Dialog } from "./";
import { Button } from "../Button";

interface DialogExampleProps {
  title: string;
  children: React.ReactNode;
  onClose?: DialogProps["onClose"];
}

function DialogExample({ title, children, onClose }: DialogExampleProps) {
  return (
    <div style={{ padding: "20px" }}>
      <button command="show-modal" commandfor="story-dialog">
        Open dialog
      </button>
      <Dialog.Root id="story-dialog" onClose={onClose} closeOnBackdropClick>
        <Dialog.Header title={title} />
        <Dialog.Body>{children}</Dialog.Body>
        <Dialog.Footer>
          <Button>Let’s do this!</Button>
        </Dialog.Footer>
      </Dialog.Root>
    </div>
  );
}

const meta = {
  title: "Components/Dialog",
  component: DialogExample,
  tags: ["autodocs"],
  args: {
    title: "My awesome Dialog",
    children: (
      <p>
        Some truly fantastic dialog content. Some truly fantastic dialog
        content. Some truly fantastic dialog content.
      </p>
    ),
  },
  subcomponents: {
    Header: Dialog.Header,
    Body: Dialog.Body,
    Footer: Dialog.Footer,
  },
  argTypes: {},
} satisfies Meta<typeof DialogExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithTitle: Story = {
  args: { title: "Heads up" },
};

/**
 * `onClose` fires for every way the dialog can close: the Close button,
 * Escape, or a `<form method="dialog">`. Open it, close it, and check the
 * Actions panel to see the callback being called.
 */
export const WithOnClose: Story = {
  args: {
    title: "Heads up",
    onClose: fn(),
  },
};

// /** Clicks Close and asserts the alert is gone. Runs in the Interactions panel. */
// export const Dismissible: Story = {
//   args: { title: "Saved", variant: "success", dismissible: true },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     await userEvent.click(canvas.getByRole("button", { name: "Close" }));
//     await waitFor(() =>
//       expect(canvas.queryByRole("status")).not.toBeInTheDocument(),
//     );
//   },
// };

// export const AllVariants: Story = {
//   render: () => (
//     <div style={{ display: "grid", gap: 12 }}>
//       {variants.map((variant) => (
//         <Alert key={variant} variant={variant} title={variant} dismissible>
//           This is a {variant} alert.
//         </Alert>
//       ))}
//     </div>
//   ),
// };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Dialog } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    children: <p>Some fantastic dialog content.</p>,
  },
  argTypes: {},
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <button command="show-modal" commandfor="story-dialog">
        Open dialog
      </button>
      <Dialog {...args} id="story-dialog" />
    </div>
  ),
} satisfies Meta<typeof Dialog>;

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

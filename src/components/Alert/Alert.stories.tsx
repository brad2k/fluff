import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Alert } from "./Alert";

const variants = ["info", "success", "warning", "danger"] as const;

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "info",
    children: "Your session will expire in five minutes.",
  },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithTitle: Story = {
  args: { title: "Heads up" },
};

/** Clicks Close and asserts the alert is gone. Runs in the Interactions panel. */
export const Dismissible: Story = {
  args: { title: "Saved", variant: "success", dismissible: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(canvas.queryByRole("status")).not.toBeInTheDocument(),
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant} title={variant} dismissible>
          This is a {variant} alert.
        </Alert>
      ))}
    </div>
  ),
};

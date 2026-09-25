import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const variants = ["primary", "secondary", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "inline-radio", options: sizes },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Use the Controls panel to try any combination. */
export const Playground: Story = {
  args: { variant: "primary", size: "md" },
};

export const Loading: Story = {
  args: { loading: true },
};

/** Renders an anchor; the extra props are typed for links, not buttons. */
export const AsLink: Story = {
  args: { as: "a", href: "#", children: "Link button" },
};

/** Every variant at every size. */
export const Matrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          {sizes.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

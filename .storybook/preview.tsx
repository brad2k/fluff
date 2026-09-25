import type { Preview } from "@storybook/react-vite";

// Everything Fluff ships: layers, reset, tokens, utilities. Always on.
// @ts-expect-error CSS is handled by Vite at runtime.
import "../src/styles/index.css";

// Dev-only "host page" styles, not part of the package. Imported as a
// string so the toolbar can switch them on and off.
// @ts-expect-error CSS is handled by Vite at runtime.
import baseCss from "./base.css?inline";

const HOST_STYLE_ID = "fluff-host-styles";

function setBaseStyles(enabled: boolean) {
  const existing = document.getElementById(HOST_STYLE_ID);
  if (!enabled) {
    existing?.remove();
    return;
  }
  if (existing) return;
  const style = document.createElement("style");
  style.id = HOST_STYLE_ID;
  style.textContent = baseCss;
  document.head.append(style);
}

const preview: Preview = {
  globalTypes: {
    host: {
      description: "Page-level base styles underneath Fluff",
      toolbar: {
        title: "Host",
        icon: "browser",
        dynamicTitle: true,
        items: [
          { value: "base", title: "Site base styles" },
          { value: "none", title: "No base styles" },
        ],
      },
    },
  },
  initialGlobals: { host: "none" },
  decorators: [
    (Story, context) => {
      setBaseStyles(context.globals.host !== "none");
      return <Story />;
    },
  ],
};

export default preview;

import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };

// Anything declared in package.json as a dependency or peer dependency is
// left as a plain `import` in the output, so the consumer installs it once
// instead of us copying its code into dist/.
const runtimeDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

// Every component stylesheet lands in the fluff.components layer automatically,
// so nobody has to remember to wrap their CSS in @layer.
function layerComponentStyles(): Plugin {
  return {
    name: "fluff:layer-component-styles",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".module.css")) return;
      return `@layer fluff.components {\n${code}\n}`;
    },
  };
}

export default defineConfig({
  plugins: [react(), layerComponentStyles()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      cssFileName: "styles",
    },
    rollupOptions: {
      external: (id) =>
        runtimeDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        // One output file per source file, so a "use client" directive at the
        // top of Alert.tsx stays on Alert alone.
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    cssCodeSplit: false,
  },
});

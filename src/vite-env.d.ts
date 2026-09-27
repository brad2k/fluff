/// <reference types="vite/client" />

import "react";

// Invoker Commands API (command / commandfor); not yet in @types/react.
declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?: "show-modal" | "close" | "request-close" | (string & {});
    commandfor?: string;
  }
}

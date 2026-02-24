import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  preflight: false,
  globalCss: {
    body: {
      bg: "unset",
      color: "unset",
    },
  },
});

export const theme = createSystem(defaultConfig, customConfig);

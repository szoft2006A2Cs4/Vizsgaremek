import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./assets/scripts/AuthProvider.jsx";
import { theme } from "./theme";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChakraProvider value={theme}>
      <App />
    </ChakraProvider>
  </AuthProvider>,
);

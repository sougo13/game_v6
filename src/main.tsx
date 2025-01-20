import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "./Context.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

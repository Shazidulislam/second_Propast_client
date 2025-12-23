import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router";
import "aos/dist/aos.css";
import AOS from "aos";
AOS.init();
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </div>
  </StrictMode>
);

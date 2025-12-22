import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import BeRider from "../pages/Rider/Rider";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home,
      },
      {
        path:"bearider",
        Component:BeRider,
      }
    ]
  },
]);

export default router;

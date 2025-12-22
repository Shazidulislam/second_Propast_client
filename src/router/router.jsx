import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import BeRider from "../pages/Rider/Rider";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Authpage/Login";
import Register from "../pages/Authpage/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendaPercel from "../pages/SendAPercel/SendAPercel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("./servicesCenter.json"),
      },
      {
        path: "SendaPercel",
        element: (
          // <PriviteRoutes>
            <SendaPercel></SendaPercel>
          // </PriviteRoutes>
        ),
        loader: () => fetch("./servicesCenter.json"),
      },
      {
        path: "beRider",
        element: (
          // <PriviteRoutes>
            <BeRider></BeRider>
          // </PriviteRoutes>
        ),
      },
      // {
      //   path: "pricing",
      //   element: (
      //     <PriviteRoutes>
      //       <PricingCalculation></PricingCalculation>
      //     </PriviteRoutes>
      //   ),
      // },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <PriviteRoutes>
  //       <DashBoard></DashBoard>
  //     </PriviteRoutes>
  //   ),
  //   children:[
  //       {
  //           path:"/dashboard/myParcel",
  //           Component:MyParcel
  //       },
  //       {
  //         path:"payment/:parcelID",
  //         Component:Payment
  //       }
  //   ]
  // },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home"; 
import Layout from "../Layouts/Layout";
import SectionColis from "../Components/HomeSection/Body/SectionColis";
// import ProtectedRoute from "../Services/ProtectedRouter";
import SignIn from "../Components/Connection/SignIn";
import SignUp from "../Components/Connection/SignUp";
import SectionTrajet from "../Components/HomeSection/Body/SectionTrajet";
import ProtectedRoute from "../Services/ProtectedRouter";
import MyOrders from "../Components/MyOrders";
import NewOrder from "../Components/Orders/NewOrder";
import OrderUpdate from "../Components/Orders/OrderUpdateUser";
const token = localStorage.getItem("token");

const router = createBrowserRouter([
  
  {
    
    path: "/",
    element:
        <Layout />,
        children: [
          {

            path: "/",
            element:
             <Home />
           , 
          },
          {
            path: "/home/:userId",
            element: <Home />,
          },
          {
            path: "/home/:userId/trajetList",
            element: <SectionTrajet />,
          },
          {
            path: "home/trajetList",
            element: <SectionTrajet />,
          },
          {
            path: "/home/:userId/mesCommandes",
            element: (
              <MyOrders />
            ),
          },
          {
            path: "/home/:userId/:trajetId/neworder",
            element: <NewOrder />,
          },
          {
            path: "/home/:userId/:orderId",
            element: <OrderUpdate />,
          },
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
  },
]);

export default router;


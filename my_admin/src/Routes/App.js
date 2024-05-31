import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import ProtectedRoute from "../Services/ProtectedRouter";
import Layout from "../Layouts/Layout";
import SignIn from "../Components/Connection/SignIn";
import Products from "../Components/Gestion/Products/Products";
import Trajets from "../Components/Gestion/Trajets/Trajets";
import Users from "../Components/Connection/Users/Users";
import NewUser from "../Components/Connection/Users/NewUser";
import UserUpdate from "../Components/Connection/Users/UserUpdate";
import ProductCard from "../Components/Gestion/Products/ProductCard";
import NewProduct from "../Components/Gestion/Products/NewProduct";
import TrajetUpdate from "../Components/Gestion/Trajets/TrajetUpdate";
import AddNewTrajet from "../Components/Gestion/Trajets/AddNewTrajet";
import Orders from "../Components/Gestion/Orders/Orders";
import NewOrder from "../Components/Gestion/Orders/NewOrder";
import OrderUpdate from "../Components/Gestion/Orders/OrderUpdate";
import ShowTrajetUsers from "../Components/Gestion/Trajets/ShowTrajetUsers";

const token = localStorage.getItem("token");
const userRole = localStorage.getItem("userRole");

console.log("userRole", userRole);

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <SignIn />
    ),
  },

  { path: "//home/admin/:userId", element: <Layout />,
  children: [
    {
      path: "/home/admin/:userId",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
         
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/products",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1} >
          {/* <NavBarMenu /> */}
          <Products />
          {/* <Footer /> */}
        </ProtectedRoute>
      ),
    },
  
    {
      path: "/home/admin/:userId/products/newProduct",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <NewProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/products/:productId",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <ProductCard  />
        </ProtectedRoute>
      ),
    },
  
    {
      path: "/home/admin/:userId/trajets",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <Trajets />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/trajets/newTrajet",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <AddNewTrajet/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/trajets/:trajetId",
      element: (
        <ProtectedRoute isAuthenticated={token}  isAdmin={parseInt(userRole) === 1}>
          <TrajetUpdate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/trajets/:trajetId/listOfUsers",
      element: (
        <ProtectedRoute isAuthenticated={token}  isAdmin={parseInt(userRole) === 1}>
          <ShowTrajetUsers />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/users",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <Users />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/users/newUser",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <NewUser />
        </ProtectedRoute>
      ),
    },
    { 
      path: "/home/admin/:userId/users/:userIdChange",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <UserUpdate />
        </ProtectedRoute>
      ),
    },
    { 
      path: "/home/admin/:userId/orders",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <Orders />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/trajets/:trajetId/newOrder",
      element: (
        <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
          <NewOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/admin/:userId/orders/:orderId",
      element: (
        <ProtectedRoute isAuthenticated={token}  isAdmin={parseInt(userRole) === 1}>
          <OrderUpdate />
        </ProtectedRoute>
      ),
    },
    
  ] },

]);

export default router;

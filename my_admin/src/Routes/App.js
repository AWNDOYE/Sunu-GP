import { createBrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import ProtectedRoute from "../Services/ProtectedRouter";
import NavBarMenu from "../Components/NavBarFooter/NavBarMenu";
import Footer from "../Components/NavBarFooter/Footer";
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

import OrderUpdateUser from "../Components/Gestion/Orders/OrderUpdateUser";

const token = localStorage.getItem("token");
const userRole = localStorage.getItem("userRole");

console.log("userRole", userRole);

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },

  {
    path: "/home/admin/:userId",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <Home />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/products",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1} >
        <NavBarMenu />
        <Products />
        <Footer />
      </ProtectedRoute>
    ),
  },

  {
    path: "/home/admin/:userId/products/newProduct",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <NewProduct />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/products/:productId",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <ProductCard  />
        <Footer />
      </ProtectedRoute>
    ),
  },

  {
    path: "/home/admin/:userId/trajets",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <Trajets />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/trajets/newTrajet",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <AddNewTrajet/>
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/trajets/:trajetId",
    element: (
      <ProtectedRoute isAuthenticated={token}  isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <TrajetUpdate />
        <Footer />
      </ProtectedRoute>
    ),
  },

  {
    path: "/home/admin/:userId/users",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <Users />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/users/newUser",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <NewUser />
        <Footer />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/home/admin/:userId/users/:userIdChange",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <UserUpdate />
        <Footer />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/home/admin/:userId/orders",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <Orders />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/trajets/:trajetId/newOrder",
    element: (
      <ProtectedRoute isAuthenticated={token} isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <NewOrder />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/admin/:userId/orders/:orderId",
    element: (
      <ProtectedRoute isAuthenticated={token}  isAdmin={parseInt(userRole) === 1}>
        <NavBarMenu />
        <OrderUpdateUser />
        <Footer />
      </ProtectedRoute>
    ),
  },
  
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import ProtectedRoute from "../Services/ProtectedRouter";
import SignIn from "../Components/Connection/SignIn";

const token = localStorage.getItem("token");
const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  {
    path: "/home/",
    element: (
      <ProtectedRoute isAuthenticated={token}>
        <Home />
      // </ProtectedRoute>
    ),
  },
]);

export default router;

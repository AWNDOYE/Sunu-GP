import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isAuthenticated, isAdmin, children }) => {
console.log({ isAuthenticated, isAdmin})
  if (!isAuthenticated || !isAdmin ) {
    return <Navigate to="/" />
  }

  return (
    <div> {children} </div>
  );
};

export default ProtectedRoute;
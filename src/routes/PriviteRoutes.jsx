import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PriviteRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  let location = useLocation();

  if (loading) {
    return <span>Loading.......</span>;
  }

  console.log(location)

  if (user === null) {
    return <Navigate  state={{ from: location }}  to="/login" replace />;
  }

  return children;
};

export default PriviteRoutes;

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navigation/Navbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AnimatedContainer from "../components/ui/AnimatedContainer";

const MainLayout = ({ requireAuth = false, redirectPath = "/login" }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const renderLayout = (content) => (
    <div className="flex flex-col h-screen  ">
      <Navbar />
      <main className="flex-1 flex w-full p-2 h-full overflow-hidden">
        {content}
      </main>
    </div>
  );

  if (loading) {
    return renderLayout(<LoadingSpinner />);
  }
  if (requireAuth && !isAuthenticated) {
    return renderLayout(
      <Navigate to={redirectPath} state={{ from: location }} replace />
    );
  }
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return renderLayout(<Outlet />);
};

export default MainLayout;

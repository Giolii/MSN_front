import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navigation/Navbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AnimatedContainer from "../components/ui/AnimatedContainer";

const MainLayout = ({ requireAuth = false, redirectPath = "/login" }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const renderLayout = (content) => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatedContainer
          className="p-8 flex items-center justify-center text-[var(--color-foreground)] bg-[var(--color-surface)] rounded-lg shadow"
          duration={300}
        >
          {content}
        </AnimatedContainer>
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

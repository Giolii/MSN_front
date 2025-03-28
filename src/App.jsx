import { Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";
import { NotFound } from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<HomeLayout requireAuth={true} />}>
          <Route index element={<Chat />} />
        </Route>
        <Route element={<MainLayout requireAuth={false} redirectPath="/" />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout requireAuth={false} redirectPath="/" />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

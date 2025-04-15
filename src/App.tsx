
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import ProvidersPage from "./pages/ProvidersPage";
import ProviderDetail from "./pages/ProviderDetail";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
            <Route path="/services/:id" element={<Layout><ServiceDetail /></Layout>} />
            <Route path="/providers" element={<Layout><ProvidersPage /></Layout>} />
            <Route path="/providers/:id" element={<Layout><ProviderDetail /></Layout>} />
            <Route path="/signup" element={<Layout><SignUp /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/admin" element={
              <Layout>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

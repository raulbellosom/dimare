import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import MainLayout from "@/layouts/MainLayout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import LandingPage from "@/views/Landing";
import DesignerPage from "@/views/Designer";
import ProductsPage from "@/views/Products";
import BenefitsPage from "@/views/Benefits";
import BlogPage from "@/views/Blog";
import AboutPage from "@/views/About";

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/disenador" element={<DesignerPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/beneficios" element={<BenefitsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

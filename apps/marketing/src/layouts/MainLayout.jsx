import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "@/components/shared";

export default function MainLayout() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />

      <main className="flex-1 relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

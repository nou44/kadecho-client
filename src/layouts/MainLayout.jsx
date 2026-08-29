import { Outlet } from "react-router-dom";

import AnnouncementBar from "../components/layout/AnnouncementBar/AnnouncementBar";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

import FloatingProduct from "../components/floating-product/FloatingProduct";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function MainLayout() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Outlet />
      </main>

      {/* Floating Product */}
      <FloatingProduct />

      {/* WhatsApp */}
      <WhatsAppButton />

      <Footer />
    </>
  );
}
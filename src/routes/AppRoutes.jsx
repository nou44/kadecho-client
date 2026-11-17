
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// ======================================
// LAYOUTS
// ======================================

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const DashboardLayout = lazy(() =>
  import("../layouts/DashboardLayout")
);

// ======================================
// WEBSITE PAGES
// ======================================

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const Projects = lazy(() => import("../pages/Projects"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Cart = lazy(() => import("../pages/Cart"));

const CheckoutPage = lazy(() =>
  import("../pages/CheckoutPage")
);

const NotFound = lazy(() =>
  import("../pages/NotFound")
);

const ProductPage = lazy(() =>
  import("../pages/Product")
);

const ProjectDetails = lazy(() =>
  import("../pages/ProjectDetails")
);

// ======================================
// DASHBOARD PAGES
// ======================================

const DashboardHome = lazy(() =>
  import("../components/dashboard/DashboardHome")
);

const AddProduct = lazy(() =>
  import("../components/dashboard/AddProduct")
);

const AddProject = lazy(() =>
  import("../components/dashboard/AddProject")
);

const Products = lazy(() =>
  import("../components/dashboard/Products")
);

const Orders = lazy(() =>
  import("../components/dashboard/Orders")
);

const ContactMessages = lazy(() =>
  import("../components/dashboard/ContactMessages")
);

const Settings = lazy(() =>
  import("../components/dashboard/Settings")
);

const Invoices = lazy(() =>
  import("../pages/dashboard/Invoices")
);

const SavedInvoices = lazy(() =>
  import("../pages/dashboard/SavedInvoices")
);

const DashboardProjects = lazy(() =>
  import("../pages/dashboard/DashboardProjects")
);

const TopProducts = lazy(() =>
  import("../pages/dashboard/TopProducts")
);

const Subscribers = lazy(() =>
  import("../pages/dashboard/Subscribers")
);

// ======================================
// LIGHTWEIGHT PAGE FALLBACK
// ======================================

function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Chargement de la page"
      className="
        flex min-h-[45vh] w-full
        items-center justify-center
        bg-[#050505]
      "
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            h-9 w-9 animate-spin
            rounded-full
            border-2 border-white/10
            border-t-red-500
          "
        />

        <span
          className="
            text-[10px] font-medium
            uppercase tracking-[0.3em]
            text-zinc-500
          "
        >
          Chargement
        </span>
      </div>
    </div>
  );
}

// ======================================
// APP ROUTES
// ======================================

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>

        {/* ==================================
            PUBLIC WEBSITE
        ================================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:slug"
            element={<ProjectDetails />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/product/:id"
            element={<ProductPage />}
          />
        </Route>

        {/* ==================================
            AUTH
        ================================== */}

        <Route path="/login" element={<Login />} />

        {/* ==================================
            DASHBOARD
        ================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="products/new"
            element={<AddProduct />}
          />

          <Route
            path="projects"
            element={<DashboardProjects />}
          />

          <Route
            path="projects/new"
            element={<AddProject />}
          />

          <Route
            path="top-products"
            element={<TopProducts />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="messages"
            element={<ContactMessages />}
          />

          <Route
            path="subscribers"
            element={<Subscribers />}
          />

          <Route
            path="invoices"
            element={<Invoices />}
          />

          <Route
            path="invoices/saved"
            element={<SavedInvoices />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

        {/* ==================================
            404
        ================================== */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}

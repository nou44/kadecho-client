import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// =========================
// WEBSITE PAGES
// =========================

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/Product";
import ProjectDetails from "../pages/ProjectDetails";

// =========================
// DASHBOARD PAGES / COMPONENTS
// =========================

import DashboardHome from "../components/dashboard/DashboardHome";

import AddProduct from "../components/dashboard/AddProduct";
import AddProject from "../components/dashboard/AddProject";
import Products from "../components/dashboard/Products";
import Orders from "../components/dashboard/Orders";
import ContactMessages from "../components/dashboard/ContactMessages";
import Settings from "../components/dashboard/Settings";

import Invoices from "../pages/dashboard/Invoices";
import SavedInvoices from "../pages/dashboard/SavedInvoices";
import DashboardProjects from "../pages/dashboard/DashboardProjects";
import TopProducts from "../pages/dashboard/TopProducts";
import Subscribers from "../pages/dashboard/Subscribers";

// =========================
// AUTH
// =========================

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          MAIN WEBSITE
      ===================================================== */}

      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}
        <Route
          path="/shop"
          element={<Shop />}
        />

        {/* PROJECTS */}
        <Route
          path="/projects"
          element={<Projects />}
        />

        {/* PROJECT DETAILS */}
        <Route
          path="/projects/:slug"
          element={<ProjectDetails />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={<ProductPage />}
        />

      </Route>


      {/* =====================================================
          AUTH
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        {/* =========================
            DASHBOARD HOME
            /dashboard
        ========================= */}

        <Route
          index
          element={<DashboardHome />}
        />


        {/* =========================
            PRODUCTS
            /dashboard/products
        ========================= */}

        <Route
          path="products"
          element={<Products />}
        />

        {/* ADD PRODUCT
            /dashboard/products/new
        */}

        <Route
          path="products/new"
          element={<AddProduct />}
        />


        {/* =========================
            PROJECTS
            /dashboard/projects
        ========================= */}

<Route
  path="projects"
  element={<DashboardProjects />}
/>

        {/* ADD PROJECT
            /dashboard/projects/new
        */}

        <Route
          path="projects/new"
          element={<AddProject />}
        />


<Route
  path="top-products"
  element={<TopProducts />}
/>


        {/* =========================
            ORDERS
            /dashboard/orders
        ========================= */}

        <Route
          path="orders"
          element={<Orders />}
        />


        {/* =========================
            CONTACT MESSAGES
            /dashboard/messages
        ========================= */}

        <Route
          path="messages"
          element={<ContactMessages />}
        />


        {/* =========================
            SUBSCRIBERS
            /dashboard/subscribers
        ========================= */}

     <Route
  path="subscribers"
  element={<Subscribers />}
/>


        {/* =========================
            INVOICES
            /dashboard/invoices
        ========================= */}

        <Route
          path="invoices"
          element={<Invoices />}
        />

<Route
  path="/dashboard/invoices/saved"
  element={<SavedInvoices />}
/>
      


        {/* =========================
            SETTINGS
            /dashboard/settings
        ========================= */}

    <Route
  path="settings"
  element={<Settings />}
/>

      </Route>


      {/* =====================================================
          404
      ===================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}
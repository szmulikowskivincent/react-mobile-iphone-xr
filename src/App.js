import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Register from "./components/authentification/Register";
import Login from "./components/authentification/Login";

import Services from "./components/Services";
import About from "./components/About";
import DashboardVenteAchat from "./components/DashboardVenteAchat";
import ServicesOffresPayment from "./components/paiements/ServicesOffresPayment";
import PaymentConsole from "./components/paiements/PaymentConsole";

import ProfileEntreprise from "./components/ProfileEntreprise";
import DashboardSponsores from "./components/DashboardSponsores";
import ContactSponsor from "./components/ContactSponsor";

import Cover from "./components/Cover";
import PaginationRouter from "./components/navigation/PaginationRouter";

import DashboardSponsor from "./components/profil/DashboardSponsor";
import DashboardSportClub from "./components/profil/DashboardSportClub";
import DashboardAdmin from "./components/profil/DashboardAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/abonnement" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfileEntreprise />} />
        <Route path="/dashboard" element={<DashboardSponsores />} />
        <Route path="/offres" element={<ServicesOffresPayment />} />
        <Route path="/paiement" element={<PaymentConsole />} />

        <Route path="/sponsor" element={<DashboardSponsor />} />
        <Route path="/club" element={<DashboardSportClub />} />
        <Route path="/database" element={<DashboardAdmin />} />

        <Route
          path="/dashboard-vente-achat"
          element={<DashboardVenteAchat />}
        />
        <Route path="/contact" element={<ContactSponsor />} />
      </Routes>
      <Pagination />
    </Router>
  );
}

function Pagination() {
  const location = useLocation();

  if (location.pathname === "/dashboard-vente-achat") {
    return null;
  }

  if (location.pathname === "/" || location.pathname === "/cover") {
    return null;
  }

  if (location.pathname === "/" || location.pathname === "/paiement") {
    return null;
  }

  if (location.pathname === "/" || location.pathname === "/offres") {
    return null;
  }

  return <PaginationRouter />;
}

export default App;

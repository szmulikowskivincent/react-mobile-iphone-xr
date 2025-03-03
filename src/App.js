import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Register from "./components/authentification/Register";
import Login from "./components/authentification/Login";

import Abonnements from "./components/Abonnements.jsx";
import Store from "./components/Store";
import Offres from "./components/paiements/Offres";
import PaymentConsole from "./components/paiements/PaymentConsole";
import Objectifs from "./components/Objectfs.jsx";

import Profile from "./components/Profile";
import AjouterUnProduit from "./components/AjouterUnProduit";
import Contact from "./components/Contact.jsx";

import Cover from "./components/Cover";

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
        <Route path="/abonnement" element={<Abonnements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ajouterProduit" element={<AjouterUnProduit />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/paiement" element={<PaymentConsole />} />
        <Route path="/objectifs" element={<Objectifs />} />

        <Route path="/sponsor" element={<DashboardSponsor />} />
        <Route path="/club" element={<DashboardSportClub />} />
        <Route path="/database" element={<DashboardAdmin />} />

        <Route path="/store" element={<Store />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

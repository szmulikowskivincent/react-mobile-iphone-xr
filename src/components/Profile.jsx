import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavigation from "./navigation/UserNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    companyName: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const savedProfile = sessionStorage.getItem("companyProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Logo = await convertToBase64(file);
        setProfile((prevProfile) => ({
          ...prevProfile,
          logo: base64Logo,
        }));
        setLogoPreview(base64Logo);
      } catch (error) {
        console.error("Erreur lors de la conversion en base64", error);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    sessionStorage.setItem("companyProfile", JSON.stringify(profile));
    alert("Profil enregistré avec succès !");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "360px",
          height: "830px",
          backgroundColor: "#fff",
          padding: "20px",
          border: "9px solid black",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
        }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo_ZakUp_v1.webp"
            alt="Logo"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <UserNavigation />
        <div className="text-center mb-3">
          <img
            src={
              logoPreview ||
              "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            }
            className="img-fluid rounded-circle"
            style={{ width: "100px", height: "100px" }}
            alt="Profil"
          />
        </div>
        <form onSubmit={handleSave}>
          {["companyName", "description", "address", "phone", "email"].map(
            (name, index) => (
              <div className="form-group input-group mb-3" key={name}>
                <span className="input-group-text">
                  <i
                    className={`bi ${
                      [
                        "bi-person-circle",
                        "bi-file-earmark-text",
                        "bi-geo-alt",
                        "bi-phone",
                        "bi-envelope",
                      ][index]
                    }`}
                  ></i>
                </span>
                {name === "description" ? (
                  <textarea
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Description de l'Entreprise"
                    required
                  ></textarea>
                ) : (
                  <input
                    type={
                      name === "phone"
                        ? "tel"
                        : name === "email"
                        ? "email"
                        : "text"
                    }
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                    required
                  />
                )}
              </div>
            )
          )}
          <div className="form-group input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-image"></i>
            </span>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
            />
          </div>
          <button
            style={{ marginTop: "25px" }}
            type="submit"
            className="btn btn-info w-100"
          >
            <i className="bi bi-save"></i> Sauvegarder
          </button>
        </form>
      </div>
      <button
        onClick={() => navigate("/")}
        className="btn"
        style={{
          backgroundColor: "#00BFFF",
          marginTop: "100px",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "10px 30px",
          position: "absolute",
          marginTop: "735px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";

const Cover = ({ children }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="iphone-xr-cover">
      <Navbar />
      {children}
      {isLogoVisible && (
        <img
          src="/apple_logo_PNG19673.png"
          alt="Apple Logo"
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "300px",
            marginLeft: "75px",
            objectFit: "contain",
            transition: "opacity 1s ease-out",
          }}
        />
      )}
    </div>
  );
};

export default Cover;

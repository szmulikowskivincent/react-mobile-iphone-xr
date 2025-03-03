import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import { Lock } from "react-bootstrap-icons";

const Cover = ({ children }) => {
  const [signalLevel, setSignalLevel] = useState(3);
  const [isLocked, setIsLocked] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const correctCode = "13070";

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalLevel((prev) => (prev === 4 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (num) => {
    setEnteredCode((prev) => {
      const newCode = prev + num;
      if (newCode === correctCode) {
        setIsLocked(false);
        return "";
      }
      return newCode;
    });
  };

  return (
    <div
      className="iphone-xr-cover"
      style={{
        position: "relative",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
      }}
    >
      <Navbar />
      {children}

      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "50%",
          transform: "translateX(50%)",
          backgroundColor: "black",
          borderRadius: "10px",
          width: "80px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#3a3a3a",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: "4px",
                height: `${level * 4}px`,
                backgroundColor: level <= signalLevel ? "green" : "lightgray",
                borderRadius: "2px",
                transition: "background-color 0.3s ease-in-out",
              }}
            ></div>
          ))}
        </div>
        <div
          style={{
            width: "20px",
            height: "10px",
            border: "2px solid black",
            borderRadius: "3px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "2px",
          }}
        >
          <div
            style={{
              width: "35%",
              height: "100%",
              backgroundColor: "red",
              borderRadius: "2px",
            }}
          ></div>
          <div
            style={{
              width: "3px",
              height: "6px",
              backgroundColor: "black",
              position: "absolute",
              right: "-5px",
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: "1px",
            }}
          ></div>
        </div>
      </div>

      <button
        onClick={() => setIsLocked(true)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "15px",
          borderRadius: "50%",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <Lock size={24} />
      </button>

      {isLocked && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <p>Entrez votre code</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                onClick={() => handleButtonClick(num.toString())}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cover;

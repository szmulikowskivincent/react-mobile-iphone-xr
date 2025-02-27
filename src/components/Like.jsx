import { useState, useEffect } from "react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likeCount");
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10));
    }
  }, []);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("likeCount", newLikes);
  };

  return (
    <button
      onClick={handleLike}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "295px",
        width: "105px",
        color: "transparent",
        border: "none",
        padding: "12px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "transparent",
        backgroundColor: "transparent",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span style={{ color: "yellow" }}>👍</span>
      <span style={{ color: "red" }}>{likes}</span>
    </button>
  );
};

export default LikeButton;

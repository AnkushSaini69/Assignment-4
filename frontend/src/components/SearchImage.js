import React, { useState } from "react";

function SearchImage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const searchImage = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    try {
      // Fetch from backend on port 3000
      const res = await fetch(`http://localhost:3000/api/getImage?name=${name}`);
      const data = await res.json();

      if (data.url) {
        // Image also comes from backend port 3000
        setImageUrl(`http://localhost:3000${data.url}`);
      } else {
        alert("Image not found!");
        setImageUrl("");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to connect to backend server.");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Search Image</h2>

      <input
        type="text"
        placeholder="Enter: tom, jerry, dog"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <button
        onClick={searchImage}
        style={{ marginLeft: "10px", padding: "8px 12px" }}
      >
        Search
      </button>

      <br /><br />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Character"
          width="250"
          style={{ border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
}

export default SearchImage;

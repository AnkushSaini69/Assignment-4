import React, { useState } from "react";

function UploadImage() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    if (!name) {
      alert("Please enter a character name (tom, jerry, dog)");
      return;
    }
    if (!file) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`http://localhost:3000/api/upload?name=${name}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      alert(data.message || "Upload complete!");

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Upload & Replace Image</h2>

      <input
        type="text"
        placeholder="Enter name: tom, jerry, dog"
        onChange={(e) => setName(e.target.value.toLowerCase())}
        style={{ padding: "8px", width: "250px" }}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={uploadImage}
        style={{ padding: "8px 15px" }}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadImage;

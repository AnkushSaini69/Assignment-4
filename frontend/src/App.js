import React from "react";
import SearchImage from "./components/SearchImage";
import UploadImage from "./components/UploadImage";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Image Search & Upload System</h1>

      <SearchImage />

      <hr />

      <UploadImage />
    </div>
  );
}

export default App;

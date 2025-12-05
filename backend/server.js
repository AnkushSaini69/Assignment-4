const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// MUST BE FIRST
app.use(cors());
app.use(express.json());

// Serve public images
app.use(express.static(path.join(__dirname, "public")));

// ------------------ GET IMAGE API ------------------
app.get("/api/getImage", (req, res) => {
    const name = req.query.name?.toLowerCase();

    if (!name) {
        return res.status(400).json({ error: "Missing ?name parameter" });
    }

    let image = "default.jpg";
    if (name.includes("tom")) image = "tom.jpg";
    if (name.includes("jerry")) image = "jerry.jpg";
    if (name.includes("dog")) image = "dog.jpg";

    res.json({ url: "/" + image });
});


// ------------------ MULTER SETUP ------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


// ------------------ UPLOAD IMAGE API ------------------
app.post("/api/upload", upload.single("image"), (req, res) => {
    const name = req.query.name?.toLowerCase();

    if (!name) {
        return res.status(400).json({ error: "Missing ?name=tom" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const finalPath = path.join(__dirname, "public", `${name}.jpg`);

    fs.renameSync(req.file.path, finalPath);

    res.json({ message: "Image uploaded & replaced successfully!" });
});


// ------------------ START SERVER ------------------
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

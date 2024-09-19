require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeConnection } = require("./config/database");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

const authRoutes = require("./routes/authRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const courseRoutes = require("./routes/courseRoutes");
const videoRoutes = require("./routes/videoRoutes");
const purchasedCoursesRoutes = require("./routes/purchasedCoursesRoutes");
const storePurchaseRoutes = require("./routes/storePurchaseRoutes");
const courseContentRoutes = require("./routes/courseContentRoutes");

app.use("/auth", authRoutes); 
app.use("/checkout", checkoutRoutes);
app.use("/courses", courseRoutes);
app.use("/videos", videoRoutes);
app.use("/purchased", purchasedCoursesRoutes);
app.use("/store-purchase", storePurchaseRoutes);
app.use("/course-content", courseContentRoutes);


initializeConnection()
  .then((connection) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }) 
  .catch((err) => {
    console.error("Error initializing database connection:", err);
  });

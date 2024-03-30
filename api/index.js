const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables from Vercel environment
const { DATABASE, DATABASE_PASSWORD, PORT } = process.env;

// MongoDB connection
mongoose
  .connect(DATABASE.replace("<password>", DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

const userRouter = require("../routes/userRoutes");
const bookRouter = require("../routes/BookRoutes");
const issueRouter = require("../routes/issueRoutes");
const issuedBookRouter = require("../routes/issuedBookRoutes");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/issueBook", issueRouter);
app.use("/api/v1/issuedBooks", issuedBookRouter);

app.get("/", (req, res, next) => {
  res.send("<h1>Hello</h1>");
  next();
});

// Listen on dynamically assigned port
app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT || 8080}`);
});

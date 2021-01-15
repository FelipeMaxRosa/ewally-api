const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Routes
const boletoRoutes = require("./routes/api/boleto")

// BodyParser and Cors Middleware
app.use(cors());
app.use(express.json());

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to EWally API, access /boleto to more details",
  });
});

// Use Routes
app.use("/boleto", boletoRoutes);
// app.use("/api/users", usersRoutes);

// Listen Port
app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});

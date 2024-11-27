const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");

// express app setup
const app = express();

const PORT = process.env.PORT || 4001;
const API_URL = process.env.API_URL || "http://localhost:3000";

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/reports/balancesheet", async (req, res) => {
  try {
    const xeroAPI = `${API_URL}/api.xro/2.0/reports/balancesheet`;

    const response = await axios.get(xeroAPI);

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "API endpoint not found" });
    } else {
      res.status(500).json({ error: "Failed to fetch data from Docker API" });
    }
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

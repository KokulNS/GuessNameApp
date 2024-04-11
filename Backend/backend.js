const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/guess", async (req, res) => {
  const name = req.body.name;

  try {
    const agifyResponse = await axios.get(`https://api.agify.io?name=${name}`);
    const genderizeResponse = await axios.get(
      `https://api.genderize.io?name=${name}`
    );
    const nationalizeResponse = await axios.get(
      `https://api.nationalize.io?name=${name}`
    );

    const age = agifyResponse.data.age;
    const gender = genderizeResponse.data.gender;
    const country =
      nationalizeResponse.data.country[0]?.country_id || "Unknown";

    res.json({ age, gender, country });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from APIs" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

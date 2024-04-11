import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/guess", {
        name,
      });
      setAge(response.data.age);
      setGender(response.data.gender);
      setCountry(response.data.country);
      setError("");
    } catch (error) {
      setError("Failed to fetch data from APIs");
    }
  };

  return (
    <div>
      <h1>Name Guesser</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Guess</button>
      </form>
      {error && <p>{error}</p>}
      {age && <p>Estimated age: {age}</p>}
      {gender && <p>Estimated gender: {gender}</p>}
      {country && <p>Estimated country: {country}</p>}
    </div>
  );
}

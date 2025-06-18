import { useEffect, useState } from 'react';

export default function Menu() {
  // State for å lagre værdata
  const [menuItems, setMenuItems] = useState([]);

  // Hent data fra backend når komponenten laster
  useEffect(() => {
    fetch("http://localhost:5272/weatherforecast")  // <- riktig URL til API
      .then(response => response.json())
      .then(data => {
        console.log("Fetched:", data);  // Debugging i konsoll
        setMenuItems(data);             // Lagre data i state
      })
      .catch(error => console.error("Failed to fetch:", error)); // Feilmelding
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Værmelding</h2>

      {menuItems.length === 0 ? (
        <p>Laster værdata...</p>
      ) : (
        <ul>
          {menuItems.map((item: any, index: number) => (
            <li key={index}>
              {new Date(item.date).toLocaleDateString("no-NO")}:{" "}
              {item.temperatureC}°C – {item.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

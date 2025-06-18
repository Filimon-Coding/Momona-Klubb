import { useEffect, useState } from 'react';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5272/api/menuitems")
      .then(response => response.json())
      .then(data => {
        console.log("Meny fra backend:", data);
        setMenuItems(data);
      })
      .catch(error => console.error("Feil ved henting:", error));
  }, []);
  
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Meny</h2>
      <ul>
        {menuItems.map((item: any) => (
          <li key={item.id}>
            {item.name} – {item.price} kr
          </li>
        ))}
      </ul>
    </div>
  );
}

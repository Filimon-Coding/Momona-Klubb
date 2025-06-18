import { useState } from 'react';

export default function User() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    fetch("http://localhost:5272/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          alert("Bruker registrert!");
          setFormData({ firstName: "", lastName: "", email: "", phone: "" });
        } else {
          alert("Noe gikk galt under innsending");
        }
      })
      .catch(error => {
        console.error("Feil ved innsending:", error);
        alert("Serverfeil");
      });
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Brukerregistrering</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Fornavn" onChange={handleChange} required /><br />
        <input type="text" name="lastName" placeholder="Etternavn" onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="E-post" onChange={handleChange} required /><br />
        <input type="tel" name="phone" placeholder="Telefonnummer" onChange={handleChange} required /><br />
        <button type="submit">Send inn</button>
      </form>
    </div>
  );
}

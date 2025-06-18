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
    console.log('Sending data to backend:', formData);
    // TODO: Send til backend senere
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

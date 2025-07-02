import React, { useState } from 'react';

function ContactDonationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    contactMethod: 'email',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nombre requerido';
    if (!form.email.trim()) {
      newErrors.email = 'Correo requerido';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!form.description.trim()) newErrors.description = 'Describe tu donación';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      // Aquí podrías enviar los datos a una API o email
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-3">
        <div className="text-green-600 text-4xl">🎁</div>
        <div className="text-green-600 font-bold text-lg">¡Gracias por tu interés en donar!</div>
        <p className="text-gray-600 text-sm">Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold mb-1">Nombre completo *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Teléfono (opcional)</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Descripción de la donación *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
        {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">¿Cómo prefieres que te contactemos?</label>
        <select
          name="contactMethod"
          value={form.contactMethod}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="email">Correo electrónico</option>
          <option value="phone">Teléfono</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
      >
        Enviar
      </button>
    </form>
  );
}

export default ContactDonationForm; 
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function VolunteerContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    motivation: '',
    contactMethod: 'email',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nombre requerido';
    if (!form.email.trim()) {
      newErrors.email = 'Correo requerido';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!form.motivation.trim()) newErrors.motivation = 'Cuéntanos por qué quieres ser voluntario';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setLoading(true);
      // Adaptar los datos al template de emailjs
      const Datos = {
        nombre: form.name,
        correo: form.email,
        asunto: 'Solicitud de Voluntariado',
        mensaje: form.motivation || 'No proporcionado',
      };
      // Log para depuración
      console.log('Datos enviados a EmailJS:', Datos);
      // Validación extra de campos vacíos
      if (!Datos.nombre || !Datos.correo || !Datos.asunto || !form.motivation) {
        setError('Todos los campos requeridos deben estar completos.');
        setLoading(false);
        return;
      }
      emailjs
        .send('service_ke9gzcs', 'template_cho3xqg', Datos, '3mQx8AVIUbbufg0BX')
        .then(
          (response) => {
            setSubmitted(true);
            setLoading(false);
          },
          (err) => {
            if (err?.status === 412) {
              setError('Error 412: Algún campo requerido por el template de EmailJS está vacío o mal nombrado. Revisa la consola para ver los datos enviados.');
              console.error('Error 412 - Datos enviados:', Datos);
            } else {
              setError('No se pudo enviar el correo. Intenta de nuevo.');
            }
            setLoading(false);
          }
        );
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-3">
        <div className="text-green-600 text-4xl">🤝</div>
        <div className="text-green-600 font-bold text-lg">¡Gracias por tu interés en ser voluntario!</div>
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
        <label className="block text-sm font-semibold mb-1">¿Por qué quieres ser voluntario? *</label>
        <textarea
          name="motivation"
          value={form.motivation}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
        {errors.motivation && <div className="text-red-600 text-xs mt-1">{errors.motivation}</div>}
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
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default VolunteerContactForm; 
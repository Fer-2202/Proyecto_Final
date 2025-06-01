import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from '../../../api/axiosInstance';
import { registerYupSchema } from '../schemas/YupRegisterSchema';
import { registerZodSchema } from '../schemas/ZodRegisterSchema';

import { ToastContainer, toast } from 'react-toastify';
import { getProvinces } from '../../../api/provinces';
import { getRoles } from '../../../api/roles';
import useFileToBase64 from '../../../hooks/useFileToBase64';

import { Eye, EyeOff } from 'lucide-react';

function RegisterForm() {
  const [provinces, setProvinces] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { base64: profilePictureBase64, loading: imageLoading, error: imageError, convert } = useFileToBase64();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        toast.error('Error al cargar las provincias.');
      }
    };
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        toast.error('Error al cargar los roles.');
      }
    };
    fetchProvinces();
    fetchRoles();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log("Registration payload:", values);
    try {
      const payload = {
        username: values.username,
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        profile: {
          phone: values.profile.phone,
          address: values.profile.address,
          birth_date: values.profile.birth_date,
          profile_picture: profilePictureBase64 || null,
          bio: values.profile.bio,
          province: values.profile.id_provinces ? values.profile.id_provinces : null,
          roles: values.profile.roles ? [parseInt(values.profile.roles)] : []
        }
      };
      console.log("Payload sent to backend:", payload);
      registerZodSchema.parse(payload);
      const response = await axiosInstance.post('/api/register/', payload);
      if (response.status === 201) {
        toast.success('¡Usuario creado exitosamente! Ahora puedes iniciar sesión.');
      } else {
        setErrors({ general: 'Error en el registro. Inténtalo de nuevo.' });
        toast.error('No se pudo crear el usuario. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.name === 'ZodError') {
        const fieldErrors = {};
        err.errors.forEach(error => {
          if (error.path) {
            fieldErrors[error.path[0]] = error.message;
          } else if (error.message) {
             fieldErrors.general = error.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Error de validación. Revisa los campos.');
      } else if (err.response && err.response.data) {
        const backendErrors = {};
        let generalErrorMessage = 'Error en el registro: ';
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            backendErrors[key] = err.response.data[key].join(' ');
            generalErrorMessage += `${key}: ${backendErrors[key]} `;
          } else {
            backendErrors[key] = err.response.data[key];
             generalErrorMessage += `${key}: ${backendErrors[key]} `;
          }
        }
        setErrors(backendErrors);
        toast.error(generalErrorMessage.trim());
      } else {
        console.error('Registration error:', err);
        setErrors({ general: 'Error en el registro. Inténtalo de nuevo.' });
        toast.error('No se pudo crear el usuario. Inténtalo de nuevo.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#fafbfc] mt-30 mb-5 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Crear una cuenta</h1>
        <p className="text-gray-500 text-base">¿Ya tienes una cuenta? <a href="/login" className="text-[#26b7ad] hover:underline">Inicia sesión</a></p>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Regístrate</h2>
        <p className="text-gray-500 mb-6">Crea tu cuenta para comprar entradas y más</p>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            profile: {
              phone: '',
              address: '',
              birth_date: '',
              profile_picture: null,
              bio: '',
              roles: '',
              id_provinces: null
            }
          }}
          validationSchema={registerYupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, setFieldValue }) => (
            <Form className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium text-gray-700">Nombre</label>
                  <Field name="first_name" type="text" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="last_name" className="text-sm font-medium text-gray-700">Apellido</label>
                  <Field name="last_name" type="text" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                  <Field name="username" type="text" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                  <Field name="email" type="email" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="relative">
                    <Field name="password" type={showPassword ? 'text' : 'password'} placeholder="********" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad] pr-10 w-full" />
                    <button type="button" tabIndex={-1} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-7 00 focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye />
                      ) : (
                        <EyeOff />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="profile.birth_date" className="text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <Field name="profile.birth_date" type="date" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="profile.birth_date" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="profile.roles" className="text-sm font-medium text-gray-700">Rol</label>
                  <Field 
                    name="profile.roles" 
                    as="select" 
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad] bg-gray-100"
                    disabled={true}
                    onChange={e => {
                      const clientRole = roles.find(role => role.name.toLowerCase() === 'cliente');
                      if (clientRole) {
                        setFieldValue('profile.roles', clientRole.id);
                      }
                    }}
                  >
                    <option value="">Seleccione un rol</option>
                    {roles.map(role => (
                      <option 
                        key={role.id} 
                        value={role.id}
                        selected={role.name.toLowerCase() === 'cliente'}
                      >
                        {role.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="profile.roles" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="profile.id_provinces" className="text-sm font-medium text-gray-700">Provincia</label>
                  <Field name="profile.id_provinces" as="select" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" onChange={e => {
                    const value = e.target.value;
                    const parsedValue = parseInt(value);
                    setFieldValue('profile.id_provinces', value === '' || isNaN(parsedValue) ? null : parsedValue);
                  }}>
                    <option value="">Seleccione una provincia</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="profile.id_provinces" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="profile.phone" className="text-sm font-medium text-gray-700">Teléfono</label>
                  <Field name="profile.phone" type="text" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="profile.phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label htmlFor="profile.address" className="text-sm font-medium text-gray-700">Dirección</label>
                  <Field name="profile.address" type="text" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="profile.address" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label htmlFor="profile.profile_picture" className="text-sm font-medium text-gray-700">Foto de Perfil</label>
                  <input
                    id="profile.profile_picture"
                    name="profile.profile_picture"
                    type="file"
                    accept="image/*"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
                    onChange={e => {
                      const file = e.target.files[0];
                      setFieldValue('profile.profile_picture', file);
                      convert(file);
                    }}
                  />
                  {imageLoading && <div className="text-gray-500 text-sm">Cargando imagen...</div>}
                  {imageError && <div className="text-red-500 text-sm">{imageError}</div>}
                  {profilePictureBase64 && (
                    <img src={profilePictureBase64} alt="Vista previa" className="mt-2 rounded h-20 w-20 object-cover border" />
                  )}
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label htmlFor="profile.bio" className="text-sm font-medium text-gray-700">Bio</label>
                  <Field name="profile.bio" as="textarea" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
                  <ErrorMessage name="profile.bio" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              {errors.general && <div className="text-red-500 text-sm">{errors.general}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
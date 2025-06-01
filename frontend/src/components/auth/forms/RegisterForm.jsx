import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from '../../../api/axiosInstance'; // Corrected import path
import { registerYupSchema } from '../schemas/YupRegisterSchema'; // Assuming you have this schema
import { registerZodSchema } from '../schemas/ZodRegisterSchema'; // Assuming you have this schema
import { toast } from 'react-hot-toast'; // Import toast for feedback
import { getProvinces } from '../../../api/provinces'; // Import the new API function
mira import { getRoles } from '../../../api/roles'; // Import roles API

function RegisterForm() {
  const [provinces, setProvinces] = useState([]);
  const [roles, setRoles] = useState([]); // State to store roles

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

  const handleSubmit = async (values, { setSubmitting }) => {
    // Log the payload to inspect what is being sent
    console.log("Registration payload:", values);
    try {
      // Prepare payload: send role at root, profile fields inside profile
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
          profile_picture: values.profile.profile_picture,
          bio: values.profile.bio,
          province: values.profile.id_provinces ? values.profile.id_provinces : null,
          roles: values.profile.roles ? [parseInt(values.profile.roles)] : []
        }
      };
      console.log("Payload sent to backend:", payload);
      registerZodSchema.parse(payload);
      const response = await axiosInstance.post('/api/register/', payload);
      if (response.status === 201) {
        toast.success('Registro exitoso! Ahora puedes iniciar sesión.');
      } else {
        setErrors({ general: 'Error en el registro. Inténtalo de nuevo.' });
        toast.error('Error en el registro. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error during registration:', err); // Log the error object
      if (err.name === 'ZodError') {
        // Handle Zod validation errors
        const fieldErrors = {};
        err.errors.forEach(error => {
          if (error.path) {
            fieldErrors[error.path[0]] = error.message;
          } else if (error.message) { // Handle potential top-level Zod errors
             fieldErrors.general = error.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Error de validación. Revisa los campos.'); // Use toast for validation error
      } else if (err.response && err.response.data) {
        // Handle backend errors (e.g., email already exists)
        // Assuming backend returns errors in a format like { field_name: ['error message'] }
        const backendErrors = {};
        let generalErrorMessage = 'Error en el registro: ';
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            backendErrors[key] = err.response.data[key].join(' ');
            generalErrorMessage += `${key}: ${backendErrors[key]} `; // Add backend errors to general message
          } else {
            backendErrors[key] = err.response.data[key];
             generalErrorMessage += `${key}: ${backendErrors[key]} `; // Add backend errors to general message
          }
        }
        setErrors(backendErrors);
        toast.error(generalErrorMessage.trim()); // Use toast for backend errors
      } else {
        // Handle other errors (network issues, etc.)
        console.error('Registration error:', err);
        setErrors({ general: 'Error en el registro. Inténtalo de nuevo.' });
        toast.error('Error en el registro. Inténtalo de nuevo.'); // Use toast for other errors
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
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
            roles: '', // Will hold selected role ID
            id_provinces: null
          }
        }}
        validationSchema={registerYupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Add form fields for all user model fields */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <Field name="first_name" type="text" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
              <Field name="last_name" type="text" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field name="username" type="text" className="mt-1 block w-full border border-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <Field name="email" type="email" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            {/* UserProfile fields nested under 'profile' */}
            <div>
              <label htmlFor="profile.birth_date" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <Field name="profile.birth_date" type="date" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="profile.birth_date" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            {/* Role field - dynamic select */}
            <div>
              <label htmlFor="profile.roles" className="block text-sm font-medium text-gray-700">Rol</label>
              <Field name="profile.roles" as="select" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" onChange={e => setFieldValue('profile.roles', e.target.value)}>
                <option value="">Seleccione un rol</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Field>
              <ErrorMessage name="profile.roles" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            {/* You'll need to fetch provinces to populate this field */}
            <div>
              <label htmlFor="profile.id_provinces" className="block text-sm font-medium text-gray-700">Provincia</label>
              <Field name="profile.id_provinces" as="select" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" onChange={e => {
                const value = e.target.value;
                const parsedValue = parseInt(value);
                setFieldValue('profile.id_provinces', value === '' || isNaN(parsedValue) ? null : parsedValue);
              }}>
                <option value="">Seleccione una provincia</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))} {/* Map provinces here, ensure value is a number */}
              </Field>
              <ErrorMessage name="profile.id_provinces" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="profile.address" className="block text-sm font-medium text-gray-700">Dirección</label>
              <Field name="profile.address" type="text" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="profile.address" component="div" className="text-red-500 text-sm mt-1" />
            </div>
             <div>
              <label htmlFor="profile.phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <Field name="profile.phone" type="text" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="profile.phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>
             <div>
              <label htmlFor="profile.bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <Field name="profile.bio" as="textarea" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="profile.bio" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <Field name="password" type="password" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {errors.general && <div className="text-red-500 text-sm mt-1">{errors.general}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextInputField } from './TextInputField';
import { PasswordInputField } from './PasswordInputField';
import { SelectField } from './SelectField';
import ProvinceSelect from './ProvinceSelect';
import { ToastNotifications } from './ToastNotifications';
import { toast } from 'react-toastify';
import axiosInstance from '../../../api/axiosInstance';
import { registerYupSchema } from '../schemas/YupRegisterSchema';
import { getProvinces } from '../../../api/provinces';
import { getRoles } from '../../../api/roles';
import { useAuth } from "../../../context/AuthContext"

export default function RegisterForm() {
  const [provinces, setProvinces] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await getProvinces();
        const rolesData = await getRoles();
        setProvinces(provincesData);
        setRoles(rolesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Construir payload JSON (sin profile_picture porque es un archivo)
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
        province: values.profile.id_provinces,
        roles: values.profile.roles ? [values.profile.roles] : [],
        profile_picture: values.profile.profile_picture,
        bio: values.profile.bio
      }
    };

    try {
      const response = await axiosInstance.post('/api/register/', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('¡Usuario creado exitosamente!');
        // Si quieres, aquí puedes redirigir al login:
        // window.location.href = '/login';
      } else {
        toast.error('Error en el registro. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error en el registro.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#fafbfc] min-h-screen py-12">
      <ToastNotifications />
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
              profile_picture: "", 
              bio: '',
              roles: roles.find(r => r.name.toLowerCase() === 'client')?.id || '',
              id_provinces: null,
            },
          }}
          validationSchema={registerYupSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInputField label="Nombre" name="first_name" />
                <TextInputField label="Apellido" name="last_name" />
                <TextInputField label="Username" name="username" />
                <TextInputField label="Correo electrónico" name="email" type="email" />
                <PasswordInputField label="Contraseña" name="password" />
                <TextInputField label="Fecha de Nacimiento" name="profile.birth_date" type="date" />
                <SelectField
                  label="Rol"
                  name="profile.roles"
                  options={roles}
                  value={String(values.profile.roles)}
                  onValueChange={val => setFieldValue('profile.roles', parseInt(val))}
                  disabled
                />
                <ProvinceSelect
                  provinces={provinces}
                  value={values.profile.id_provinces ? String(values.profile.id_provinces) : ''}
                  onChange={val => setFieldValue('profile.id_provinces', parseInt(val))}
                />
                <TextInputField label="Teléfono" name="profile.phone" />
                <TextInputField label="Dirección" name="profile.address" />
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Foto de Perfil (se sube después)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFieldValue('profile.profile_picture', e.target.files[0])}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
                  />
                  <small className="text-gray-500">Esta imagen no se envía en este paso. Puedes subirla después en tu perfil.</small>
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="profile.bio"
                    value={values.profile.bio}
                    onChange={e => setFieldValue('profile.bio', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
                  />
                  <ErrorMessage name="profile.bio" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

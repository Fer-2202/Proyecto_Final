import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../../context/AuthContext';
import { loginYupSchema } from '../schemas/YupLoginSchema';
import { ToastContainer, toast } from 'react-toastify';
/* import 'react-toastify/dist/ReactToastify.css'; */

function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const credentials = {
        username: values.identifier,
        password: values.password,
      };
      const success = await login(credentials);
      if (success) {
        toast.success('Login successful! Redirecting...');
        setTimeout(() => 2000);
      }
    } catch (error) {
      setErrors({ password: 'Invalid username or password' });
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
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
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Formik
        initialValues={{ identifier: '', password: '' }}
        validationSchema={loginYupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Username</label>
              <Field name="identifier" type="text" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field name="password" type="password" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
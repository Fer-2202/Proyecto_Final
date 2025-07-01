import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "@context/AuthContext";
import { loginYupSchema } from "../schemas/YupLoginSchema";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const credentials = {
        username: values.identifier,
        password: values.password,
      };
      const success = await login(credentials);
      if (success) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => 2000);
      }
    } catch (error) {
      setErrors({ password: "Invalid username or password" });
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
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
      <div className="flex flex-col items-center mb-6 mt-20">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Iniciar Sesión
        </h1>
        <p className="text-gray-500 text-base">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-[#26b7ad] hover:underline">
            Regístrate
          </a>
        </p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Bienvenido de nuevo
        </h2>
        <p className="text-gray-500 mb-6">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={loginYupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de usuario{/* (Correo electrónico en progreso) */}
                </label>
                <Field
                  name="identifier"
                  type="text"
                  placeholder="tu@email.com"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
                />
                <ErrorMessage
                  name="identifier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad] pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675m2.122-2.122A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.336 3.234-.938 4.675m-2.122 2.122A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z"
                      />
                    </svg>
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <div className="flex justify-end mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-[#26b7ad] text-sm hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
              <div className="text-xs text-gray-500 text-center mt-4">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link
                  to="/terminos-y-condiciones/terminos"
                  className="text-[#26b7ad] hover:underline"
                >
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link
                  to="/privacidad/politica-de-privicidad"
                  className="text-[#26b7ad] hover:underline"
                >
                  Política de Privacidad
                </Link>
              </div>
              {/* Meter page terminos */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@api/axiosInstance"; // Correcta importacion path
import { forgotPasswordZodSchema } from "../schemas/ZodForgotPasswordSchema"; // Digammos que creamos este schema

function ForgotPasswordForm() {
  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      forgotPasswordZodSchema.parse(values); // Validaciones con Zod

      // Assuming a backend endpoint for requesting password reset email
      const response = await axiosInstance.post(
        "/auth/forgot-password/",
        values
      );

      if (response.status === 200) {
        // Check for successful request status
        setStatus(
          "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña."
        );
      } else {
        // Handle other successful but unexpected responses
        console.error("Forgot password request unexpected:", response.data);
        setErrors({
          general:
            "Error al solicitar el restablecimiento de contraseña. Inténtalo de nuevo.",
        });
      }
    } catch (err) {
      if (err.name === "ZodError") {
        // Handle Zod validation errors
        const fieldErrors = {};
        err.errors.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else if (err.response && err.response.data) {
        // Handle backend errors
        const backendErrors = {};
        for (const key in err.response.data) {
          if (Array.isArray(err.response.data[key])) {
            backendErrors[key] = err.response.data[key].join(" ");
          } else {
            backendErrors[key] = err.response.data[key];
          }
        }
        setErrors(backendErrors);
      } else {
        // Handle other errors (network issues, etc.)
        console.error("Forgot password request error:", err);
        setErrors({
          general:
            "Error al solicitar el restablecimiento de contraseña. Inténtalo de nuevo.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>
      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, status }) => (
          <Form className="space-y-4">
            {status && (
              <div className="text-green-600 text-sm mb-4">{status}</div>
            )}
            {errors.general && (
              <div className="text-red-500 text-sm mb-4">{errors.general}</div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#26b7ad] text-white py-2 px-4 rounded hover:bg-[#239e99] transition"
            >
              {isSubmitting
                ? "Enviando..."
                : "Enviar enlace de restablecimiento"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPasswordForm;

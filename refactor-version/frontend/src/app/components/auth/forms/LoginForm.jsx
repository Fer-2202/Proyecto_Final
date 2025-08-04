/**
 * LoginForm.jsx
 * 
 * PROBLEMA SOLUCIONADO:
 * Error: "services.login is not a function"
 * 
 * CAUSA:
 * Se intentaba usar services.login() pero la estructura correcta es services.auth.login()
 * El objeto services exporta diferentes servicios (auth, animals, exhibitions, etc.)
 * y cada servicio tiene sus propios métodos.
 * 
 * SOLUCIÓN:
 * Cambiar services.login(values) por services.auth.login(values)
 * 
 * ESTRUCTURA DE SERVICIOS:
 * services.auth.login()          - Iniciar sesión
 * services.auth.register()       - Registrar usuario
 * services.auth.logout()         - Cerrar sesión
 * services.animals.getAll()      - Obtener animales
 * services.exhibitions.getAll()  - Obtener exhibiciones
 * etc.
 */

import React, { useState } from "react";
import { services } from "@config/services";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
});

/**
 * Componente LoginForm
 * 
 * Formulario de inicio de sesión que permite a los usuarios autenticarse
 * en el sistema del parque marino.
 * 
 * Características:
 * - Validación de campos con Yup
 * - Manejo de estados de carga
 * - Notificaciones toast para feedback
 * - Redirección automática tras login exitoso
 * 
 * Uso:
 * <LoginForm />
 * 
 * Modificaciones:
 * - Para cambiar campos: modificar initialValues y LoginSchema
 * - Para cambiar validaciones: editar LoginSchema
 * - Para cambiar redirección: modificar navigate("/dashboard")
 */
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      await toast.promise(
        services.auth.login(values),
        {
          pending: 'Logging in...',
          success: {
            render() {
              navigate("/dashboard");
              return 'Login successful';
            }
          },
          error: {
            render({data}) {
              setErrors({ submit: data?.message || 'Unknown error' });
              return `Login failed: ${data?.message || 'Unknown error'}`;
            }
          }
        }
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, handleChange, handleBlur }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username ? "border-red-500" : ""}
                />
                {errors.username && touched.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Campo de contraseña con checkbox en la misma línea del label */}
               <div className="space-y-2 mb-4">
                 {/* Label de Password y checkbox Remember me en la misma línea */}
                 <div className="flex items-center justify-between">
                   <Label htmlFor="password">Password</Label>
                   
                   {/* Checkbox Remember me alineado a la derecha del label */}
                   <div className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       name="remember" 
                       id="remember" 
                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                     />
                     <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
                   </div>
                 </div>
                 
                 {/* Campo de input de contraseña */}
                 <Input
                   id="password"
                   name="password"
                   type="password"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   className={errors.password && touched.password ? "border-red-500" : ""}
                 />
                 
                 {/* Mensaje de error de contraseña */}
                 {errors.password && touched.password && (
                   <p className="text-sm text-red-500">{errors.password}</p>
                 )}
               </div>

               {/* Enlace de contraseña olvidada centrado */}
               <div className="mb-4">
                 <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                   Olvidaste tu contraseña
                 </a>
               </div>

               <Separator />

              {errors.submit && (
                <p className="text-sm text-red-500">{errors.submit}</p>
              )}

              <Button 
                type="submit"
                className="w-full"
                disabled={loading || isSubmitting}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>

  );
}

export default LoginForm;

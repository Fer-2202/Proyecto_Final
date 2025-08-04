import React from "react";
import LoginForm from "@/app/components/auth/forms/LoginForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Login() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <h1>Bienvenido de nuevo</h1>
              <p>Ingrese sus credenciales para acceder a su cuenta</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Login;

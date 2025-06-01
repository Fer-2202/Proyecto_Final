import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

export function PasswordInputField({ label, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Field
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26b7ad] pr-10 w-full"
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700 focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}

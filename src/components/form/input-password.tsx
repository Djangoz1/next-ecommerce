"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Icon } from "@iconify/react/dist/iconify.js";

export const InputPassword = ({ id = "password" }: { id?: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        required
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={
          id === "password" ? "Mot de passe" : "Confirmation du mot de passe"
        }
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Icon
          className="text-2xl"
          icon={showPassword ? "mdi-light:eye-off" : "mdi-light:eye"}
        />
      </button>
    </div>
  );
};

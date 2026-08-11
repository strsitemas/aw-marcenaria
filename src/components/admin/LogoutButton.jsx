"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="font-texto text-sm text-madeira hover:text-dourado transition"
    >
      Sair
    </button>
  );
}

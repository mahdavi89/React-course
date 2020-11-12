import React from "react";
import { AuthContext } from "./Auth.provider";

export default function useAuth() {
  const auth = React.useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

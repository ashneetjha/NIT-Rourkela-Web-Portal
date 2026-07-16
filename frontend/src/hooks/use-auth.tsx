import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { api } from "../lib/api.js";
import type { AuthUser } from "../types/api.js";

interface AuthContextValue {
  user: AuthUser | null;
  token: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredAuth = () => {
  if (typeof window === "undefined") {
    return { token: "", user: null as AuthUser | null };
  }

  const token = window.localStorage.getItem("msms.token") ?? "";
  const user = window.localStorage.getItem("msms.user");

  return {
    token,
    user: user ? (JSON.parse(user) as AuthUser) : null,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initial = readStoredAuth();
  const [token, setToken] = useState(initial.token);
  const [user, setUser] = useState<AuthUser | null>(initial.user);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("msms.token", token);
    } else {
      window.localStorage.removeItem("msms.token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("msms.user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("msms.user");
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login: async (email: string, password: string) => {
        const response = await api.login(email, password);
        setToken(response.token);
        setUser(response.user);
        toast.success(`Welcome back, ${response.user.name}.`);
      },
      logout: () => {
        setToken("");
        setUser(null);
        toast.info("You have been signed out.");
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

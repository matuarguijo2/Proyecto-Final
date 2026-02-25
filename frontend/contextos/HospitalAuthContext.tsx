"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Hospital } from "@/lib/authHospital";
import * as authHospital from "@/lib/authHospital";

type HospitalAuthContextType = {
  hospital: Hospital | null;
  token: string | null;
  loading: boolean;
  login: (usuario: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setHospital: (h: Hospital | null) => void;
  refreshHospital: () => Promise<void>;
};

const HospitalAuthContext = createContext<HospitalAuthContextType | null>(null);

export function HospitalAuthProvider({ children }: { children: ReactNode }) {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshHospital = useCallback(async () => {
    const t = authHospital.getStoredTokenHospital();
    if (!t) {
      setHospital(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const me = await authHospital.getMeHospital(t);
      setHospital(me);
      setToken(t);
    } catch {
      authHospital.clearStoredTokenHospital();
      setHospital(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = authHospital.getStoredTokenHospital();
    if (!t) {
      setLoading(false);
      return;
    }
    refreshHospital();
  }, [refreshHospital]);

  const login = useCallback(async (usuario: string, password: string) => {
    const { accessToken } = await authHospital.loginHospital(usuario, password);
    authHospital.setStoredTokenHospital(accessToken);
    const me = await authHospital.getMeHospital(accessToken);
    setToken(accessToken);
    setHospital(me);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authHospital.logoutHospital();
    } finally {
      authHospital.clearStoredTokenHospital();
      setToken(null);
      setHospital(null);
    }
  }, []);

  return (
    <HospitalAuthContext.Provider
      value={{ hospital, token, loading, login, logout, setHospital, refreshHospital }}
    >
      {children}
    </HospitalAuthContext.Provider>
  );
}

export function useHospitalAuth() {
  const ctx = useContext(HospitalAuthContext);
  if (!ctx) throw new Error("useHospitalAuth debe usarse dentro de HospitalAuthProvider");
  return ctx;
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TerminalCtx = { enabled: boolean; toggle: () => void };

const Ctx = createContext<TerminalCtx>({ enabled: false, toggle: () => {} });

export function TerminalModeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.terminal = enabled ? "true" : "";
  }, [enabled]);

  return (
    <Ctx.Provider value={{ enabled, toggle: () => setEnabled((v) => !v) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTerminalMode = () => useContext(Ctx);

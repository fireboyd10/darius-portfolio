import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({ language: "en", setLanguage: () => {} });

function initialLanguage() {
  try {
    return window.localStorage.getItem("portfolio-language") === "ro" ? "ro" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "ro"
      ? "Portofoliu Darius Aniculaesei"
      : "Darius Aniculaesei Portfolio";
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // Language switching remains available when browser storage is unavailable.
    }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

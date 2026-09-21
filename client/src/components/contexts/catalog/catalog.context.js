import { createContext, useContext } from "react";

export const CatalogContext = createContext(undefined);

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return ctx;
};

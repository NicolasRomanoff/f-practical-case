import { useEffect, useState } from "react";
import { CatalogContext } from "./catalog.context";

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load products");
      }
      setCatalog(Array.isArray(json) ? json : []);
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  };

  return (
    <CatalogContext.Provider
      value={{ catalog, isLoading, isError, refetch: fetchCatalog }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

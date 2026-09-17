import { useEffect, useState } from "react";

const Catalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleAddToCart = (productId) => {};

  const fetchCatalog = async () => {
    setLoadingCatalog(true);
    // setErrors([]);
    try {
      const response = await fetch("/api/products");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load products");
      }
      setCatalog(Array.isArray(json) ? json : []);
      // setLastRefreshAt(new Date().toISOString());
    } catch (error) {
      // setErrors((prev) => [
      //   ...prev,
      //   `Catalog fetch failed: ${error.message}`,
      // ]);
    }
    setLoadingCatalog(false);
  };

  return (
    <section className="panel">
      <h3>Filters</h3>
      <div className="filters">
        <label>
          Search
          <input
            value={catalogSearch}
            onChange={(event) => setCatalogSearch(event.target.value)}
            placeholder="Search name"
          />
        </label>
      </div>

      <h3>Catalog list {loadingCatalog ? "(loading...)" : ""}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.base_price}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
          {catalog.length === 0 ? (
            <tr>
              <td colSpan="4">No product found</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
};

export default Catalog;

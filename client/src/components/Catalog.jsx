import { useEffect, useState } from "react";
import { useCart } from "./contexts/cart/cart.context";

const Catalog = () => {
  const { addToCart } = useCart();
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    let nextCatalog = [...catalog];

    if (catalogSearch.trim()) {
      const normalized = catalogSearch.toLowerCase();
      nextCatalog = nextCatalog.filter((product) => {
        return (
          String(product.name || "")
            .toLowerCase()
            .includes(normalized) ||
          String(product.configuration || "")
            .toLowerCase()
            .includes(normalized)
        );
      });
    }
    setFilteredCatalog(nextCatalog);
  }, [catalog, catalogSearch]);

  const fetchCatalog = async () => {
    setLoadingCatalog(true);
    try {
      const response = await fetch("/api/products");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load products");
      }
      setCatalog(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error(error);
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
            placeholder="Search name / configuration"
          />
        </label>
      </div>
      <h3>Catalog list {loadingCatalog ? "(loading...)" : ""}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Configuration</th>
            <th>Status</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCatalog.map((product) => (
            <tr key={product.product_variants_id}>
              <td>{product.name}</td>
              <td>{product.configuration}</td>
              <td>{product.status}</td>
              <td>{product.stock}</td>
              <td>{product.price} €</td>
              <td>
                <button type="button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
          {filteredCatalog.length === 0 ? (
            <tr>
              <td colSpan="6">No product found</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
};

export default Catalog;

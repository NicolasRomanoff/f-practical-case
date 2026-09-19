import { useEffect, useState } from "react";
import CartSidebar from "./CartSidebar";
import { useCart } from "./contexts/cart/cart.context";
import { useCatalog } from "./contexts/catalog/catalog.context";

const Catalog = () => {
  const { catalog, isLoading } = useCatalog();
  const { addToCart } = useCart();
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [catalogSearch, setCatalogSearch] = useState("");

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

  return (
    <>
      <CartSidebar />
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
        <h3>Catalog list {isLoading ? "(loading...)" : ""}</h3>
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
              <tr key={product.product_variant_id}>
                <td>{product.name}</td>
                <td>{product.configuration}</td>
                <td>{product.status}</td>
                <td>{product.stock}</td>
                <td>{product.price} €</td>
                <td>
                  <button
                    disabled={!product.stock}
                    type="button"
                    onClick={() => addToCart(product)}
                  >
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
    </>
  );
};

export default Catalog;

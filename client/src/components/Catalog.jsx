import { useEffect, useMemo, useState } from "react";

const isSearchingMatch = (product, search) => {
  const normalized = search?.trim().toLowerCase();
  if (!normalized) return true;

  return (
    String(product.name || "")
      .toLowerCase()
      .includes(normalized) ||
    String(product.type || "")
      .toLowerCase()
      .includes(normalized)
  );
};

const Catalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [isErrorCatalog, setIsErrorCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogTypeFilter, setCatalogTypeFilter] = useState();

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    setFilteredCatalog(
      catalog.filter((product) => {
        if (catalogTypeFilter && product.type !== catalogTypeFilter) {
          return false;
        }
        return isSearchingMatch(product, catalogSearch);
      }),
    );
  }, [catalog, catalogSearch, catalogTypeFilter]);

  const catalogTypeOptions = useMemo(() => {
    const set = new Set();
    catalog.forEach((product) => {
      if (product.type) {
        set.add(product.type);
      }
    });
    return Array.from(set);
  }, [catalog]);

  const fetchCatalog = async () => {
    setIsLoadingCatalog(true);
    try {
      const response = await fetch("/api/catalog");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load catalog");
      }

      setCatalog(Array.isArray(json) ? json : []);
    } catch (error) {
      setIsErrorCatalog(true);
    }
    setIsLoadingCatalog(false);
  };

  const addToCart = (product) => {};

  if (isLoadingCatalog) return <div>Loading</div>;
  if (isErrorCatalog) return <div>Error</div>;

  return (
    <section className="panel">
      <h3>Filters</h3>
      <div className="filters">
        <label>
          Type filter
          <select
            value={catalogTypeFilter}
            onChange={(event) => setCatalogTypeFilter(event.target.value)}
          >
            <option value="">All</option>
            {catalogTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Search
          <input
            value={catalogSearch}
            onChange={(event) => setCatalogSearch(event.target.value)}
            placeholder="Search name / type"
          />
        </label>
      </div>

      <h3>Catalog list</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCatalog &&
            filteredCatalog.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.quantity}</td>
                <td>
                  <button type="button" onClick={() => addToCart(product)}>
                    Add to your cart
                  </button>
                </td>
              </tr>
            ))}
          {filteredCatalog && filteredCatalog.length === 0 ? (
            <tr>
              <td colSpan="4">No devices found</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
};

export default Catalog;

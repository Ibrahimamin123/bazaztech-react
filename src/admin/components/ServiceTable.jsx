import { useMemo, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ServiceTable = ({ services, onEdit, onDelete, loading }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return services.filter((service) =>
      service.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="table-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            className="form-control"
            placeholder="Search services..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <span className="text-muted">{filtered.length} result(s)</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary" />
                </td>
              </tr>
            )}

            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No services found.
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img
                      src={
                        service.image ||
                        "https://via.placeholder.com/60x60?text=BT"
                      }
                      alt={service.title}
                      className="table-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://via.placeholder.com/60x60?text=BT";
                      }}
                    />
                  </td>
                  <td>
                    <strong>{service.title}</strong>
                    <div className="small text-muted text-truncate" style={{ maxWidth: 220 }}>
                      {service.description}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        service.status ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {service.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{service.features?.length || 0}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(service)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(service._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-sm btn-light"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span className="align-self-center small">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-light"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;

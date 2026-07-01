import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import ServiceTable from "../components/ServiceTable";
import ServiceModal from "../components/ServiceModal";
import { deleteService, getServices } from "../services/serviceApi";

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await getServices();
      setServices(res.data.services || []);
    } catch {
      Swal.fire("Error", "Failed to load services.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleEdit = (service) => {
    setEditData(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteService(id);
      await loadServices();
      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to delete service.", "error");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  return (
    <AdminLayout>
      <div className="dashboard-content">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2>Services Management</h2>
            <p className="text-muted mb-0">
              Manage all services displayed on the public website.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            + Add Service
          </button>
        </div>

        <div className="stat-pill mb-4">Total Services: {services.length}</div>

        <ServiceTable
          services={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        <ServiceModal
          show={showModal}
          onClose={closeModal}
          refreshServices={loadServices}
          editData={editData}
        />
      </div>
    </AdminLayout>
  );
};

export default Services;

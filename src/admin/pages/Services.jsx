import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import ServiceTable from "../components/ServiceTable";
import { getServices } from "../services/serviceApi";

const Services = () => {

  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleEdit = (service) => {
    console.log("Edit:", service);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  return (
    <AdminLayout>

      <div className="dashboard-content">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Services Management</h2>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Service
          </button>

        </div>

        <ServiceTable
          services={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ServiceModal
          show={showModal}
          onClose={() => setShowModal(false)}
          refreshServices={loadServices}
        />

      </div>

    </AdminLayout>
  );
};

export default Services;
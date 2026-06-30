import { useState } from "react";
import { addService } from "../services/serviceApi";

const ServiceModal = ({ show, onClose, refreshServices }) => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addService(form);

      refreshServices();   // reload table
      onClose();           // close modal

      setForm({
        title: "",
        description: "",
        icon: "",
        image: "",
        status: true,
      });

    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>Add Service</h5>

            <button className="btn-close" onClick={onClose}></button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <input
                className="form-control mb-2"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="icon"
                placeholder="Icon"
                value={form.icon}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
              />

              <div className="form-check">

                <input
                  type="checkbox"
                  className="form-check-input"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Active
                </label>

              </div>

            </div>

            <div className="modal-footer">

              <button type="submit" className="btn btn-primary">
                Save
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ServiceModal;
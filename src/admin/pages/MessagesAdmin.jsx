import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { deleteMessage, getMessages, updateMessage } from "../services/cmsApi";

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await getMessages();
      setMessages(res.data.messages || []);
    } catch {
      Swal.fire("Error", "Failed to load messages.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateMessage(id, { status });
      await loadMessages();
    } catch {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMessage(id);
      await loadMessages();
    } catch {
      Swal.fire("Error", "Delete failed.", "error");
    }
  };

  return (
    <AdminLayout title="Messages">
      <div className="dashboard-content">
        <p className="text-muted mb-4">View and manage contact form submissions.</p>

        <div className="table-card">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
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

                {!loading && messages.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No messages yet.
                    </td>
                  </tr>
                )}

                {!loading &&
                  messages.map((msg) => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject || msg.message?.slice(0, 40)}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={msg.status}
                          onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="pending">Pending</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(msg._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessagesAdmin;

import React, { useState, useEffect } from "react";
import { get, delet } from "../../services/Endpoint.js";
import { toast } from "react-hot-toast";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await get("/dashboard");
        const data = response.data;
        setUsers(data.users); // Assuming API returns { users: [...] }
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };
    GetData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;

      const response = await delet(`/dashboard/delete/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-black text-center mb-4">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-dark table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

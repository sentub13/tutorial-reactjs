import React, { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', email: '' });
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setUsers(users.map(user => user.id === form.id ? form : user));
      setEditing(false);
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({ id: '', name: '', email: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Management </h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update' : 'Add'} User
            </button>
            {editing && (
              <button 
                type="button" 
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setForm({ id: '', name: '', email: '' });
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button 
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="alert alert-info">No users found. Add a user to get started.</div>
      )}
    </div>
  );
};

export default App;
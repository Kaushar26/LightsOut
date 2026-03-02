import { useEffect, useState } from "react";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    points: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = () => {
    fetch("http://localhost:5000/api/drivers")
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/api/drivers/${editingId}`
      : "http://localhost:5000/api/drivers";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        points: Number(formData.points),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchDrivers();
        setFormData({ name: "", team: "", points: "" });
        setEditingId(null); // reset edit mode
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/drivers/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchDrivers())
      .catch((err) => console.error(err));
  };

  const handleEdit = (driver) => {
    setEditingId(driver._id);
    setFormData({
      name: driver.name,
      team: driver.team,
      points: driver.points,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>F1Hub Drivers</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Driver Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="team"
          placeholder="Team"
          value={formData.team}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="points"
          placeholder="Points"
          value={formData.points}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      {drivers.map((driver) => (
        <div key={driver._id} style={{ marginBottom: "15px" }}>
          <h3>{driver.name}</h3>
          <p>Team: {driver.team}</p>
          <p>Points: {driver.points}</p>

          <button
            onClick={() => handleEdit(driver)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(driver._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;